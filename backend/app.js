const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const flightRoutes = require("./routes/flightRoutes");
const mongoose = require("mongoose");
const cors = require("cors");
const authRoutes = require('./routes/authRoutes'); 

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(morgan("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
  })
);

// app.use("/api/auth", authRoutes); 
app.use("/api/flight", flightRoutes);

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("Database connected");
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Failed to connect database and starting server", err);
  });
