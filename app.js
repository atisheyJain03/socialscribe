const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Routes
// app.use("/api/users", userRouter);

app.all("*", (req, res) => {
  res.send("Hello from the server");
});

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

module.exports = app;
