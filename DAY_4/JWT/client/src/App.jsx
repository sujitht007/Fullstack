import { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const API_BASE = "http://localhost:5000";

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState("");

  const [foodName, setFoodName] = useState("");
  const [daysSinceAte, setDaysSinceAte] = useState("");
  const [foodList, setFoodList] = useState([]);

  const [editingId, setEditingId] = useState(null);
  const [editingDays, setEditingDays] = useState("");

  // Load token on refresh
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
      setIsLoggedIn(true);
      fetchFoods(savedToken);
    }
  }, []);

  // Register user
  const handleRegister = async () => {
    if (!username || !password) return alert("Enter all fields!");

    try {
      await axios.post(`${API_BASE}/api/register`, {
        username,
        password,
      });

      alert("Registration successful! Please login.");
      setUsername("");
      setPassword("");
    } catch (err) {
      alert(err.response?.data || "Registration failed!");
    }
  };

  // Login user
  const handleLogin = async () => {
    if (!username || !password) return alert("Enter all fields!");

    try {
      const res = await axios.post(`${API_BASE}/api/login`, {
        username,
        password,
      });

      const newToken = res.data.token;

      setToken(newToken);
      localStorage.setItem("token", newToken);
      setIsLoggedIn(true);

      fetchFoods(newToken);
    } catch (err) {
      alert(err.response?.data?.message || "Login failed!");
    }
  };

  // Fetch foods
  const fetchFoods = async (tok = token) => {
    try {
      const res = await axios.get(`${API_BASE}/api/readfood`, {
        headers: { Authorization: `Bearer ${tok}` },
      });

      setFoodList(res.data);
    } catch (err) {
      console.log("Fetch error:", err);
    }
  };

  // Add food
  const handleAddFood = async () => {
    if (!foodName) return alert("Enter food name!");

    try {
      const res = await axios.post(
        `${API_BASE}/api/food`,
        { name: foodName, daysSinceIAte: Number(daysSinceAte) },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Food added!");
      fetchFoods();
      setFoodName("");
      setDaysSinceAte("");
    } catch (err) {
      alert("Error adding food!");
    }
  };

  // Update food
  const handleUpdateFood = async (id) => {
    try {
      await axios.put(
        `${API_BASE}/api/updatefood/${id}`,
        {
          name: foodName,
          daysSinceIAte: Number(editingDays),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      alert("Food updated!");
      setEditingId(null);
      setFoodName("");
      setEditingDays("");
      fetchFoods();
    } catch (err) {
      alert("Error updating!");
    }
  };

  // Delete food
  const handleDeleteFood = async (id) => {
    try {
      await axios.delete(`${API_BASE}/api/deletefood/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      fetchFoods();
    } catch (err) {
      alert("Error deleting!");
    }
  };

  const logout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem("token");
  };

  return (
    <div className="app-container">
      <h1>Food Tracker</h1>

      {!isLoggedIn ? (
        <div className="auth">
          <h2>Login / Register</h2>

          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button onClick={handleLogin}>Login</button>
          <button onClick={handleRegister}>Register</button>
        </div>
      ) : (
        <div className="main">
          <button onClick={logout}>Logout</button>

          <h2>Add Food</h2>
          <input
            type="text"
            value={foodName}
            onChange={(e) => setFoodName(e.target.value)}
            placeholder="Food Name"
          />
          <input
            type="number"
            value={daysSinceAte}
            onChange={(e) => setDaysSinceAte(e.target.value)}
            placeholder="Days Since Ate"
          />
          <button onClick={handleAddFood}>Add Food</button>

          <h2>Food List</h2>

          {foodList.map((food) => (
            <div key={food._id} className="food-card">
              {editingId === food._id ? (
                <>
                  <input
                    type="text"
                    value={foodName}
                    onChange={(e) => setFoodName(e.target.value)}
                  />
                  <input
                    type="number"
                    value={editingDays}
                    onChange={(e) => setEditingDays(e.target.value)}
                  />
                  <button onClick={() => handleUpdateFood(food._id)}>
                    Save
                  </button>
                  <button onClick={() => setEditingId(null)}>Cancel</button>
                </>
              ) : (
                <>
                  <h3>{food.name}</h3>
                  <p>{food.daysSinceIAte} days ago</p>
                  <button onClick={() => {
                    setEditingId(food._id);
                    setFoodName(food.name);
                    setEditingDays(food.daysSinceIAte);
                  }}>
                    Edit
                  </button>
                  <button onClick={() => handleDeleteFood(food._id)}>
                    Delete
                  </button>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;