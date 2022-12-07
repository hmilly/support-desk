const express = require("express");
const router = express.Router({mergeParams: true});
const { getNotes } = require("../controllers/noteController");

const { protect } = require("../middlewear/authMiddlewear");

router.route("/").get(protect, getNotes);

module.exports = router;


