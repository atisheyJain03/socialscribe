const express = require("express");
const app = express();

const cron = require("node-cron");

const webhookRouter = require("./routes/webhook");
const { runFetchedRssData } = require("./services/rssAppServices");
const path = require("path");

cron.schedule("10 22 * * *", () => {
  console.log("running daily cron");
  runFetchedRssData();
});

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));

// Middleware
app.use(express.json());

app.use("/webhook", webhookRouter);

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
