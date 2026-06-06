const Event = require("../models/Event");


// ==========================
// GET EVENTS
// ==========================
const getEvents = async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({
      success: true,
      events
    });

  } catch (error) {
    console.log("GET EVENTS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch events"
    });
  }
};


// ==========================
// ADD EVENT
// ==========================
const addEvent = async (req, res) => {
  try {
    const {
      title,
      date,
      time,
      location,
      image,
      description
    } = req.body;

    if (!title || !date || !time || !location || !image || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    const newEvent = await Event.create({
      title,
      date,
      time,
      location,
      image,
      description
    });

    res.status(201).json({
      success: true,
      message: "Event added successfully",
      event: newEvent
    });

  } catch (error) {
    console.log("ADD EVENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to add event"
    });
  }
};


// ==========================
// UPDATE EVENT (FIXED VERSION)
// ==========================
const updateEvent = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Event ID is required"
      });
    }

    const updated = await Event.findByIdAndUpdate(
      id,
      {
        $set: req.body   // ✅ safer update (important fix)
      },
      {
        new: true,
        runValidators: true
      }
    );

    if (!updated) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Event updated successfully",
      event: updated
    });

  } catch (error) {
    console.log("UPDATE EVENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update event"
    });
  }
};


// ==========================
// DELETE EVENT
// ==========================
const deleteEvent = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Event.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Event deleted successfully"
    });

  } catch (error) {
    console.log("DELETE EVENT ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Failed to delete event"
    });
  }
};


// EXPORT
module.exports = {
  getEvents,
  addEvent,
  updateEvent,
  deleteEvent
};