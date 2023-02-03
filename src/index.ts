import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import morgan from "morgan";
import userRouter from "./routes/payment.routes";
import * as swaggerUi from "swagger-ui-express";
import * as YAML from "yamljs";
import { userAgent } from "./middleware";

const app = express();
const port = process.env.PORT || 5100;

//Connect to database
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("[SERVER] Connected to database!");
  })
  .catch(() => {
    console.log("[SERVER] Unable to Connect to database!");
  });

// ===================================== MIDDLEWARE ========================================

/**
 * Cors Headers middle-ware
 */
app.use(cors());
/**
 * Parse application/x-www-form-urlencoded
 */
app.use(bodyParser.urlencoded({ extended: true }));
/**
 * Parse application/json
 */
app.use(bodyParser.json());
/**
 * User Agent middleware
 */
app.use(userAgent());
/**
 * Log each request to the console
 */
app.use(morgan("dev"));

// ===================================== ROUTES ========================================
app.use("/users", userRouter);

// Swagger documentation route
app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(YAML.load("./swagger.yaml"))
);


app.listen(port, () => {
  console.log(`[SERVER] Server is running on the port ${port}.`);
});
