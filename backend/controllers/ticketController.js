const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");

// api/tickets
// GET user tickets
const getTickets = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "get tickets" });
  });

  
// api/tickets/
// POST create new ticket
const createTicket = asyncHandler(async (req, res) => {
    res.status(200).json({ message: "create tickets" });
  });
  

  module.exports = {
    getTickets,
    createTicket
  }