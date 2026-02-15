import express from "express";
import { ENV } from "./utils/env.js";
import { connectDB } from "./utils/db.js";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import eventRoutes from "./routes/event.route.js";
import registrationRoutes from "./routes/registration.route.js";

const app = express();

app.use(express.json());
app.use(cors());

//routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/registrations", registrationRoutes);

app.get("/", (req, res) => res.json({ message: "app is up and running" }));

const port = ENV.PORT || 5000;
const start = async () => {
  await connectDB();
  app.listen(port, () => console.log("server is listening on port:", port));
};

start();
