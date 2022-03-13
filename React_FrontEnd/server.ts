// Import statements cannot be used.
// Using types will prevent the code from running.

// Express
const express = require("express");

const app = express();
app.use(express.static("./build"));

// Show single webpage regardless of URL.
app.get("/", (req, res) => {
    res.sendFile("./build/index.html");
});

// Listens for connection on port and serves webpage if connection is present.
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Client server listening at http://localhost:${PORT}`);
});
