const express = require("express");
const router = express.Router();
const {
    getProfile,
    createProfile,
} = require("../controller/profile-controller");

router.post("/profile/new", createProfile);

router.get("/profile", getProfile);

module.exports = router;