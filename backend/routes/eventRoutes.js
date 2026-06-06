const express = require("express");
const router = express.Router();

const {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent
} = require("../controllers/eventController");

// GET all events
router.get("/", getEvents);

// ADD event
router.post("/add", addEvent);

// UPDATE event
router.put("/update/:id", updateEvent);

// DELETE event
router.delete("/delete/:id", deleteEvent);

module.exports = router;