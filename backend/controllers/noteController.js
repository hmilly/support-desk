const asyncHandler = require("express-async-handler");

const User = require("../models/userModel");
const Ticket = require("../models/ticketModel");
const Note = require("../models/noteModel");

// api/tickets/:ticketId/notes
// GET ticket notes
const getNotes = asyncHandler(async (req, res) => {
  // get user using id and JWT
  const user = await User.findById(req.user.id);

  if (!user) {
    res.status(401);
    throw new Error("User not found!");
  }
  const ticket = await Ticket.findById(req.params.ticketId);

  if (ticket.user.toString() !== req.user.id) {
    res.status(401);
    throw new Error("User not authorised");
  }
  
  const notes = await Note.find({ ticket: req.params.ticketId });
  res.status(200).json(notes);
});

module.exports = {
  getNotes,
};
