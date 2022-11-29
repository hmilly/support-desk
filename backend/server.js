const express = require("express");
require("colors");
require("dotenv").config();
const connectDb = require("./config/db");
const { errorHandler } = require("./middlewear/errorMiddlewear");
const PORT = process.env.PORT || 5000;

const app = express();
connectDb();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome to the support desk API" });
});

app.get("/users", (req, res) => {
  res.status(200).json({ message: "Users" });
});

// Routes
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started on port: ${PORT}`));
