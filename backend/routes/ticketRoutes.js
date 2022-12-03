const express = require("express");
const { getTickets, createTicket } = require("../controllers/ticketController");
const router = express.Router();
getTickets;

const { protect } = require("../middlewear/authMiddlewear");

router.route("/").get(protect, getTickets).post(protect, createTicket);

module.exports = router;
