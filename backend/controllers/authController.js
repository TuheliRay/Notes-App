const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
  try {
    const { username, email , password } = req.body;

  const existingUsername = await User.findOne({ username });
  if (existingUsername) return res.status(400).json({ msg: "Username already taken" });

  const existingEmail = await User.findOne({ email });
  if (existingEmail) return res.status(400).json({ msg: "Email already in use" });


    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email , password: hashedPassword });
    await user.save();

    res.status(201).json({ msg: "Signup successful" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ msg: "Server error" });
  }
};

exports.login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "1d" });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ msg: "Server error" });
  }
};
