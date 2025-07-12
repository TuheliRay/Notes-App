const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT || 5000;

const app = express();
app.use(cors({
  origin: 'https://notes-app-sand-gamma.vercel.app',
  credentials: true
}));
app.use(express.json());

// Routes
const notesRoutes = require("./routes/notes");
app.use("/api/notes", notesRoutes);

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => {
  console.log("Connected to MongoDB");
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch((err) => console.error("DB connection error:", err));
