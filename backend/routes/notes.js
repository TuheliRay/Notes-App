const express = require("express");
const router = express.Router();
const Note = require("../models/Note");

// Create a note
router.post("/", async (req, res) => {
  try {
    const note = new Note(req.body);
    const savedNote = await note.save();
    res.json(savedNote);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all notes
router.get("/", async (req, res) => {
  try {
    const notes = await Note.find();
    res.json(notes);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a note
router.put("/:id", async (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "Title and content are required." });
  }

  try {
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content },
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      return res.status(404).json({ message: "Note not found." });
    }

    res.json(updatedNote);
  } catch (err) {
    res.status(500).json({ message: "Failed to update note", error: err.message });
  }
});


// Delete a note
router.delete("/:id", async (req, res) => {
  try {
    await Note.findByIdAndDelete(req.params.id);
    res.json({ message: "Note deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
