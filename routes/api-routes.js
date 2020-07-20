const express = require("express");
const router = express.Router();
const passport = require("../config/passport");

const {
    login,
    register,
    logout,
    getUser,
} = require("../controller/auth-controller");


// Login route
// Route: http://localhost:3003/auth/login
// Type: POST

// Using the passport.authenticate middleware with our local strategy.
router.post("/auth/login", passport.authenticate("local"), login);

// Register route
// Route: http://localhost:3003/auth/register
// Type: POST

router.post("/auth/register", register);

// Get user route
// Route: http://localhost:3003/auth/register
// Type: POST

router.get("/auth/user", getUser);

// Logout route
// Route: http://localhost:3003/auth/register
// Type: GET

router.get("/auth/logout", logout);





module.exports = router;