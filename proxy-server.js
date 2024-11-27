const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");

const app = express();
const PORT = 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Proxy route to handle Judge0 API requests
app.post("/api/submissions", async (req, res) => {
    try {
        const response = await fetch("https://api.judge0.com/submissions?base64_encoded=false&wait=true", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(req.body),
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        console.error("Error fetching from Judge0:", error);
        res.status(500).json({ error: "Error fetching data from Judge0" });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Proxy server running on http://localhost:${PORT}`);
});
