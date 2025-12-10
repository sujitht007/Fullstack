const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config();

const FoodModel = require('./Food')

const app = express();
const PORT = process.env.PORT || 3000

mongoose.connect('mongodb://127.0.0.1:27017/foodDB')
    .then(() => console.log("MongoDB Connected Successfully"))
    .catch(err => console.log("Connection Error:", err.message))

app.use(cors());
app.use(express.json());

// INSERT
app.post("/insert", async (req, res) => {
    const { foodName, daySinceIate } = req.body;

    if (!foodName || !foodName.trim()) {
        return res.status(400).send("Food name is required");
    }
    if (daySinceIate === undefined || daySinceIate === "") {
        return res.status(400).send("Days since I ate is required");
    }

    try {
        const food = new FoodModel({
            foodName,
            daySinceIate: parseInt(daySinceIate)
        });

        await food.save();
        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// READ
app.get("/read", async (req, res) => {
    try {
        const foods = await FoodModel.find({});
        res.json(foods);
    } catch (error) {
        res.status(500).send("Error fetching data");
    }
});

// UPDATE
app.put("/update/:id", async (req, res) => {
    const id = req.params.id;
    const { foodName, daySinceIate } = req.body;

    try {
        await FoodModel.findByIdAndUpdate(id, {
            foodName,
            daySinceIate
        });

        res.send("Food updated");
    } catch (error) {
        res.status(500).send("Update error");
    }
});

// DELETE
app.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;

    try {
        await FoodModel.findByIdAndDelete(id);
        res.send("Food deleted");
    } catch (error) {
        res.status(500).send("Delete error");
    }
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
