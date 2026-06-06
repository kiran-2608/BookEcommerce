require("dotenv").config();

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const connectDB = require("./config/db");

// ================= MODELS =================
const User = require("./models/User");
const Event = require("./models/Event"); // ✅ IMPORTANT FIX

// ================= ROUTES =================
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require('./routes/adminRoutes');


const app = express();

app.use('/api/admin', adminRoutes);

// ================= DB CONNECT =================
connectDB();

// ================= MIDDLEWARE =================
app.use(cors());
app.use(express.json());

// ================= ROUTES =================
app.use("/api/user", userRoutes);
app.use("/api/books", bookRoutes);
app.use("/api/events", eventRoutes);



// =====================================================
// CONTACT EMAIL
// =====================================================
app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      replyTo: email,
      to: process.env.EMAIL_USER,
      subject: `New Contact Message from ${name}`,
      html: `<h3>${message}</h3>`
    });

    res.status(200).json({
      success: true,
      message: "Email sent successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Email failed"
    });
  }
});



// =====================================================
// EVENT REGISTRATION ⭐ FIXED & SAFE VERSION
// =====================================================
app.post("/register-event", async (req, res) => {
  const { name, email, phone, event } = req.body;

  if (!name || !email || !phone || !event) {
    return res.status(400).json({
      success: false,
      message: "All fields are required"
    });
  }

  try {
    // 🔍 FIND EVENT
    const eventDoc = await Event.findOne({ title: event });

    if (!eventDoc) {
      return res.status(404).json({
        success: false,
        message: "Event not found"
      });
    }

    // ⭐ INCREASE REGISTRATION COUNT
    eventDoc.registered = (eventDoc.registered || 0) + 1;
    await eventDoc.save();

    res.status(200).json({
      success: true,
      message: "Registration successful",
      updatedRegisteredCount: eventDoc.registered
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Registration failed"
    });
  }
});



// =====================================================
// REGISTER USER
// =====================================================
app.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword
    });

    res.status(201).json({
      success: true,
      message: "Registered successfully",
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});



// =====================================================
// LOGIN
// =====================================================
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      success: true,
      token,
      user
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});



// =====================================================
// CHANGE PASSWORD
// =====================================================
app.put("/change-password", async (req, res) => {
  try {
    const { email, oldPassword, newPassword } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Old password incorrect"
      });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.status(200).json({
      success: true,
      message: "Password updated"
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
});



// =====================================================
// START SERVER
// =====================================================
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});