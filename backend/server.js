require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = process.env.PORT || 3000;

// ------ Middleware ------
app.use(cors());

app.use(cors({
  origin: [
    "http://localhost:5173",
    "http://voya-travel-planner.vercel.app",
    /\.vercel\.app$/,
  ],
  credentials: true,
}));

app.use(express.json());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected.");
  })
  .catch((error) => {
    console.error("MongoDB connection failed: ", error);
  });

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
  },
  name: {
    type: String,
    default: "",
    trim: true,
  },
  location: {
    type: String,
    default: "",
    trim: true,
  },
  birthday: {
    type: String,
    default: "",
    trim: true,
  },
  dateOfBirth: {
    type: String,
    default: "",
    trim: true,
  },
  phone: {
    type: String,
    default: "",
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const tripSchema = new mongoose.Schema({
  email: { // required for connecting a trip to a user.
    type: String,
    required: true,
    lowercase: true,
    trim: true,
  },
  destination: {
    type: String,
    required: true,
    default: "",
    trim: true
  },
  startDate: {
    type: Date,
    default: Date.now
  },
  endDate: {
    type: Date
  },
  amtTravelers: {
    type: Number,
    default: null,
  },
  travelers: {
    type: [String]
  },
  flight: {
    type: String,
    default: "",
    trim: true
  },
  hotel: {
    type: String,
    default: "",
    trim: true
  },
  activities: {
    type: [String]
  }
});

const User = mongoose.model("User", userSchema);
const Trip = mongoose.model("Trip", tripSchema);

function validateInputs({ email, password }) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email || !emailRegex.test(email)) {
    return "Please enter a valid email address.";
  }
  if (!password || password.length < 8) {
    return "Password must be at least 8 characters.";
  }
  return "";
}

function getPublicUser(user) {
  return {
    email: user.email,
    name: user.name,
    location: user.location,
    birthday: user.birthday,
    dateOfBirth: user.dateOfBirth,
    phone: user.phone,
  };
}

// ============================================================
// POST /api/register
// ============================================================
app.post("/api/register", async (req, res) => {
  const { email, password, name, location, birthday, dateOfBirth, phone } = req.body;

  const validationError = validateInputs({ email, password });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: "Email already taken." });
    }

    const hash = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      email,
      password: hash,
      name,
      location,
      birthday,
      dateOfBirth,
      phone,
    });

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(201).json({
      message: "User registered successfully.",
      user: getPublicUser(newUser),
      token,
    });
  } catch (error) {
    console.error("Register error:", error);
    if (error.code === 11000) {
      return res.status(409).json({ error: "Email already taken." });
    }
    return res.status(500).json({ error: "Server error." });
  }
});

// ============================================================
// POST /api/login
// ============================================================
app.post("/api/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required." });
  }

  try {
    const user = await User.findOne({ email });
    const passwordMatches = user && (await bcrypt.compare(password, user.password));

    if (!passwordMatches) {
      return res.status(401).json({ error: "Invalid email or password." });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Login successful.",
      user: getPublicUser(user),
      token,
    });
  } catch (error) {
    console.error("Login error:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

// ============================================================
// POST /api/logout
// ============================================================
app.post("/api/logout", (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid token." });
  }

  return res.status(200).json({ message: "Logged out." });
});

// ============================================================
// POST /api/add-trip
// ============================================================
app.post("/api/add-trip", async (req, res) => {
  const { email, destination, startDate, endDate, amtTravelers, travelers, flight, hotel, activities } = req.body; // email used to identify user creating trip
  const auth = req.headers.authorization;

  try {
    const user = await User.findOne({ email });

    if (!user) { // Verify that the user exists in the first place
      return res.status(401).json({ error: "No such user exists." });
    }

    if (!auth || !auth.startsWith("Bearer ")) { // See if the token was passed in header
      return res.status(401).json({ error: "Missing or invalid token." });
    }

    try { // verify user with token passed in header.
      const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (user._id.toString() !== decode.id) { // User id is not the same as the one in the token given
        return res.status(401).json({ error: "Invalid token." }) // 401 or 409?
      }
    } catch (error) {
      console.error("Add Trip: Token verification error:", error);
      return res.status(500).json({ error: "Server error." });
    }

    // If all checks out, update database.
    const newTrip = await Trip.create({
      email,
      destination,
      startDate,
      endDate,
      amtTravelers,
      travelers,
      flight,
      hotel,
      activities
    });

    return res.status(200).json({
      message: "Trip added successfully.",
      trip: newTrip
    });
  } catch (error) {
    console.error("Trip adding error:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

// ============================================================
// PUT /api/profile/update-profile
// ============================================================
app.put("/api/profile/update-profile", async (req, res) => { // updating from profile, should this be two different endpoints? (Edit basic info and edit password/email?)
  const { email, name, dateOfBirth, phone, location } = req.body;
  const auth = req.headers.authorization;

  try {
    const user = await User.findOne({ email });

    if (!user) { // Verify that the user exists in the first place
      return res.status(401).json({ error: "No such user exists." });
    }

    if (!auth || !auth.startsWith("Bearer ")) { // See if the token was passed in header
      return res.status(401).json({ error: "Missing or invalid token." });
    }

    try { // verify user with token passed in header.
      const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!(user._id = decode.id)) { // User id is not the same as the one in the token given
        return res.status(401).json({ error: "Invalid token." }) // 401 or 409?
      }
    } catch (error) {
      console.error("Profile - Update Profile: Token verification error:", error);
      return res.status(500).json({ error: "Server error." });
    }

    user = await User.findOneAndUpdate({ email }, { name, dateOfBirth, phone, location }, {
      returnDocument: "after"
    });

    return res.status(200).json({
      message: "Profile updated successfully.",
      user: user,
    });
  } catch (error) {
    console.error("Profile - Update Profile error:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

// ============================================================
// PUT /api/profile/update-security
// ============================================================
app.put("/api/profile/update-security", async (req, res) => { // updating from profile, should this be two different endpoints? (Edit basic info and edit password/email?)
  const { email, newEmail, newPassword } = req.body;
  const auth = req.headers.authorization;

  // validate email and password?
  const validationError = validateInputs({ newEmail, newPassword });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  try {
    const existingUser = await User.findOne({ newEmail });
    if (existingUser && !(email === newEmail)) { // allows for default/original email to go through
      return res.status(409).json({ error: "Email already taken." });
    }

    const user = await User.findOne({ email });

    if (!user) { // Verify that the user exists in the first place
      return res.status(401).json({ error: "No such user exists." });
    }

    if (!auth || !auth.startsWith("Bearer ")) { // See if the token was passed in header
      return res.status(401).json({ error: "Missing or invalid token." });
    }

    try { // verify user with token passed in header.
      const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!(user._id = decode.id)) { // User id is not the same as the one in the token given
        return res.status(401).json({ error: "Invalid token." }) // 401 or 409?
      }
    } catch (error) {
      console.error("Profile - Update Security: Token verification error:", error);
      return res.status(500).json({ error: "Server error." });
    }

    // hash password, and create new token
    const hash = await bcrypt.hash(newPassword, 10);

    user = await User.findOneAndUpdate({ email }, { email: newEmail, password: hash }, {
      returnDocument: 'after',
    });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    return res.status(200).json({
      message: "Security updated successfully",
      user: getPublicUser(user),
      token: token,
    });
  } catch (error) {
    console.error("Profile - Update Security error:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

// ============================================================
// GET /api/profile/my-trips
// ============================================================
app.get("/api/profile/my-trips", async (req, res) => { // Pulls all trips the user made
  const { email } = req.body;
  const auth = req.headers.authorization;

  try {
    const user = await User.findOne({ email });

    if (!user) { // Verify that the user exists in the first place
      return res.status(401).json({ error: "No such user exists." });
    }

    if (!auth || !auth.startsWith("Bearer ")) { // See if the token was passed in header
      return res.status(401).json({ error: "Missing or invalid token." });
    }

    try { // verify user with token passed in header.
      const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!(user._id = decode.id)) { // User id is not the same as the one in the token given
        return res.status(401).json({ error: "Invalid token." }) // 401 or 409?
      }
    } catch (error) {
      console.error("Profile - My Trips: Token verification error:", error);
      return res.status(500).json({ error: "Server error." });
    }

    const trips = await Trip.find({ email: user.email });

    if (!trips) {
      return res.status(404).json({ error: "No trips found." });
    }

    // Are we caching these in localStorage or are we pulling everytime? Either way,
    // its probably a good idea to have _id somewhere to uniquely identify each trip 
    // to later modify it.
    return res.status(200).json({
      message: "Retrieved trips successfully.",
      trips: trips,
    });
  } catch (error) {
    console.error("Profile - My Trips error:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

// ============================================================
// PUT /api/profile/my-trips
// ============================================================
app.put("/api/profile/my-trips", async (req, res) => { // Updating a single trip on my trips section of profile
  const { email, id, destination, startDate, endDate, amtTravelers, travelers, flight, hotel, activities } = req.body;
  const auth = req.headers.authorization;

  try {
    const user = await User.findOne({ email });

    if (!user) { // Verify that the user exists in the first place
      return res.status(401).json({ error: "No such user exists." });
    }

    if (!auth || !auth.startsWith("Bearer ")) { // See if the token was passed in header
      return res.status(401).json({ error: "Missing or invalid token." });
    }

    try { // verify user with token passed in header.
      const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!(user._id = decode.id)) { // User id is not the same as the one in the token given
        return res.status(401).json({ error: "Invalid token." }) // 401 or 409?
      }
    } catch (error) {
      console.error("Profile - My Trips: Token verification error:", error);
      return res.status(500).json({ error: "Server error." });
    }

    // edit trip from database with new info
    const trip = Trip.findOneAndUpdate({ id }, { destination, startDate, endDate, amtTravelers, travelers, flight, hotel, activities });

    return res.status(200).json({
      message: "Updated trip successfully.",
      trip: trip,
    });
  } catch (error) {
    console.error("Profile - My Trips error:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

// ============================================================
// GET /api/profile/shared-itinerary
// ============================================================
app.get("/api/profile/shared-itinerary", async (req, res) => { // Pulls all trips that have user as a traveller
  const { email } = req.body;
  const auth = req.headers.authorization;

  try {
    const user = await User.findOne({ email });

    if (!user) { // Verify that the user exists in the first place
      return res.status(401).json({ error: "No such user exists." });
    }

    if (!auth || !auth.startsWith("Bearer ")) { // See if the token was passed in header
      return res.status(401).json({ error: "Missing or invalid token." });
    }

    try { // verify user with token passed in header.
      const token = req.headers.authorization.split(' ')[1];
      const decode = jwt.verify(token, process.env.JWT_SECRET);

      if (!(user._id = decode.id)) { // User id is not the same as the one in the token given
        return res.status(401).json({ error: "Invalid token." }) // 401 or 409?
      }
    } catch (error) {
      console.error("Profile - Shared Itinerary: Token verification error:", error);
      return res.status(500).json({ error: "Server error." });
    }

    const itns = await Trip.find({ travelers: user.email });

    if (!itns) {
      return res.status(404).json({ error: "No shared trips found." });
    }

    return res.status(200).json({
      message: "Retrieved shared itineraries successfully.",
      itns: itns,
    });
  } catch (error) {
    console.error("Profile - Shared Itinerary error:", error);
    return res.status(500).json({ error: "Server error." });
  }
});

// ============================================================
// GET /api/health
// ============================================================
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    time: new Date().toISOString(),
    mongo: mongoose.connection.readState === 1,
  });
});

// ------ 404 ROUTE -------
app.use((req, res) => {
  return res.status(404).json({ error: "Route not found." });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
