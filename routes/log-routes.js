const express = require("express");
const router = express.Router();
const {
    newLog,
    getUserLogs,
    getAllLogs,
} = require("../controller/log-controller");

// Get all coffee logs
// Route: http://localhost:3000/logs/all
// Type: GET

router.get("/logs/all", getAllLogs);

// Get all user coffee logs
// Route: http://localhost:3000/logs/user
// Type: GET

router.get("/logs/user", getUserLogs);

// Create a new user log
// Route: http://localhost:3000/logs/new
// Type: POST

router.post("/logs/new", newLog);

module.exports = router;