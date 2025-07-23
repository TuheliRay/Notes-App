const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const auth = require("../middleware/authMiddleware");

// Create a note
router.post("/", auth , async (req, res) => {
  try {
    const note = new Note({ ...req.body, user: req.user });
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all notes for a logged-in user
router.get("/", auth , async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user });
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a note (belonging to the logged-in user only)
router.put("/:id", auth, async (req, res) => {
  try {
    const updatedNote = await Note.findOneAndUpdate(
      { _id: req.params.id, user: req.user },
      { title: req.body.title, content: req.body.content },
      { new: true }
    );

    if (!updatedNote) return res.status(404).json({ message: "Note not found" });

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: "Failed to update note", error: err.message });
  }
});


// Delete a note belonging to the logged-in user only
router.delete("/:id", auth, async (req, res) => {
  try {
    const deletedNote = await Note.findOneAndDelete({ _id: req.params.id, user: req.user });
    if (!deletedNote) return res.status(404).json({ message: "Note not found" });

    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
