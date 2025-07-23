const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // refers to User model
    required: true,
  }
}, { timestamps: true });

module.exports = mongoose.model("Note", noteSchema);
