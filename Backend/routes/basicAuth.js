const express = require("express");
const router = express.Router();
const User = require("../modules/user");
const bcrypt = require("bcryptjs");

router.post("/loginUser", async (req, res) => {
  try {
    const { email, password, position } = req.body;

    // Check if user exists
    const user = await User.findOne({ email, position });

    if (!user) {
      return res.status(400).json({ message: "User not available" });
    }

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Success response (excluding password for security)
    res.status(200).json({
      message: "Login successful",
      user: {
        id: user.id,
        email: user.email,
        position: user.position,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/createUser", async (req, res) => {
  try {
    const { email, password, position } = req.body;

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      position,
    });

    const result = await user.save();

    res.status(201).json({
      success: true,
      message: `User created successfully as ${user.position}`,
      createdUser: {
        id: result.id,
        email: result.email,
        position: result.position,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});
module.exports = router;
