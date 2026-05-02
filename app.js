const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/User");
const dns = require("dns");
dns.setServers([
    '8.8.8.8',
    '1.1.1.1'
])

const app = express();
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb+srv://GECJ:gec123@gecj.o4nhqas.mongodb.net/?appName=GECj")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


// ================== CRUD ==================

// ✅ CREATE
app.post("/api/users", async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ✅ READ (All users)
app.get("/api/users", async (req, res) => {
    const users = await User.find();
    res.json(users);
});

// ✅ READ (Single user)
app.get("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch {
        res.status(404).json({ message: "User not found" });
    }
});

// ✅ UPDATE
app.put("/api/users/:id", async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(user);
    } catch {
        res.status(404).json({ message: "User not found" });
    }
});

// ✅ DELETE
app.delete("/api/users/:id", async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.json({ message: "User deleted" });
    } catch {
        res.status(404).json({ message: "User not found" });
    }
});


// 404 handler
app.use((req, res) => {
    res.status(404).send("Route not found");
});


// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});