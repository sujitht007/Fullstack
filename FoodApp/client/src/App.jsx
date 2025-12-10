import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [foodname, setFoodname] = useState("");
  const [daysSinceIate, setDaysSinceIate] = useState("");
  const [foodlist, setFoodlist] = useState([]);
  const [editInputs, setEditInputs] = useState({});

  // READ
  useEffect(() => {
    axios.get("http://localhost:3000/read")
      .then((res) => setFoodlist(res.data))
      .catch((err) => console.log(err));
  }, []);

  // INSERT
  const addToList = () => {
    if (!foodname.trim()) return alert("Enter food name");
    if (!daysSinceIate) return alert("Enter days");

    axios
      .post("http://localhost:3000/insert", {
        foodName: foodname,
        daySinceIate: parseInt(daysSinceIate),
      })
      .then((res) => {
        setFoodlist([...foodlist, res.data]);
        setFoodname("");
        setDaysSinceIate("");
      })
      .catch((err) => {
        alert(err.response?.data || "Insert error");
      });
  };

  // UPDATE
  const updateFood = (id) => {
    axios
      .put(`http://localhost:3000/update/${id}`, {
        foodName: editInputs[id],
      })
      .then(() => {
        axios.get("http://localhost:3000/read")
          .then((res) => setFoodlist(res.data));
      })
      .catch((err) => console.log(err));
  };

  // DELETE
  const deleteFood = (id) => {
    axios
      .delete(`http://localhost:3000/delete/${id}`)
      .then(() => {
        setFoodlist(foodlist.filter((item) => item._id !== id));
      });
  };

  return (
    <>
      <h1>Food Tracker</h1>

      <div>
        <input
          placeholder="Food name"
          value={foodname}
          onChange={(e) => setFoodname(e.target.value)}
        />

        <input
          type="number"
          placeholder="Days since I ate"
          value={daysSinceIate}
          onChange={(e) => setDaysSinceIate(e.target.value)}
        />

        <button onClick={addToList}>Add Food</button>
      </div>

      <div>
        {foodlist.map((food) => (
          <div key={food._id}>
            <p>
              {food.foodName} — {food.daySinceIate} days
            </p>

            <input
              placeholder="New name"
              value={editInputs[food._id] || ""}
              onChange={(e) =>
                setEditInputs({
                  ...editInputs,
                  [food._id]: e.target.value,
                })
              }
            />

            <button onClick={() => updateFood(food._id)}>Update</button>
            <button onClick={() => deleteFood(food._id)}>Delete</button>
          </div>
        ))}
      </div>
    </>
  );
}

export default App;
