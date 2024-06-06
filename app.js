import express from "express";
import userRouter from "./routes/userRouter.js";

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/api/users", userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});

export default app;
