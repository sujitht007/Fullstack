const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 5000;
const JWT_SECRET = 'your_jwt_secret'; 

app.use(express.json());
app.use(cors());

// ------------------- MONGODB CONNECTION FIXED -------------------

mongoose.connect('mongodb+srv://sujith:9345793342S@cluster0.dquerwy.mongodb.net/foodApp')
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log("MongoDB Error:", err));

// ------------------- USER SCHEMA -------------------

const UserSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true }
});

const User = mongoose.model('User', UserSchema);

// ------------------- FOOD SCHEMA -------------------

const FoodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    daysSinceIAte: { type: Number, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

const Food = mongoose.model('Food', FoodSchema);

// ------------------- TOKEN CHECK FUNCTION -------------------

const verifyToken = (req, res, next) => {
    let token = req.headers['authorization'];
    if (!token) return res.status(403).send("Token missing");

    token = token.replace('Bearer ', '');

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");
        req.userId = decoded.userId;
        next();
    });
};

// ------------------- REGISTER API -------------------

app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    try {
        const oldUser = await User.findOne({ username });
        if (oldUser) return res.status(400).json({ message: "Username already exists" });

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            username,
            password: hashedPassword
        });

        await user.save();
        res.status(201).json({ message: "User Registered Successfully" });

    } catch (error) {
        console.log("Register Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ------------------- LOGIN API -------------------

app.post('/api/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(401).json({ message: "Invalid username or password" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid username or password" });

        const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

    } catch (error) {
        console.log("Login Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ------------------- ADD FOOD -------------------

app.post('/api/food', verifyToken, async (req, res) => {
    try {
        const { name, daysSinceIAte } = req.body;

        const food = new Food({
            name,
            daysSinceIAte,
            user: req.userId
        });

        await food.save();
        res.status(201).json({ message: "Food added successfully" });

    } catch (error) {
        console.log("Add Food Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ------------------- READ FOOD -------------------

app.get('/api/readfood', verifyToken, async (req, res) => {
    try {
        const foods = await Food.find({ user: req.userId });
        res.json(foods);

    } catch (error) {
        console.log("Get Food Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ------------------- UPDATE FOOD -------------------

app.put('/api/updatefood/:id', verifyToken, async (req, res) => {
    try {
        const { name, daysSinceIAte } = req.body;

        await Food.findOneAndUpdate(
            { _id: req.params.id, user: req.userId },
            { name, daysSinceIAte }
        );

        res.json({ message: "Food updated successfully" });

    } catch (error) {
        console.log("Update Food Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ------------------- DELETE FOOD -------------------

app.delete('/api/deletefood/:id', verifyToken, async (req, res) => {
    try {
        await Food.findOneAndDelete({ _id: req.params.id, user: req.userId });
        res.json({ message: "Food deleted successfully" });

    } catch (error) {
        console.log("Delete Food Error:", error);
        res.status(500).json({ message: "Server Error" });
    }
});

// ------------------- SERVER -------------------

app.listen(port, () => {
    console.log(`🚀 Server running at http://localhost:${port}`);
});
