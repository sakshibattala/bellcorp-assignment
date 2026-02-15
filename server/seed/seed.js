import mongoose from "mongoose";
import { ENV } from "../utils/env.js";
import { Event } from "../models/event.model.js";
import { eventsData } from "./events.js";

const seedData = async () => {
  try {
    await mongoose.connect(ENV.MONGODB_URI);
    await Event.deleteMany();
    await Event.insertMany(eventsData);
    console.log("Events Seeded Successfully");
    await mongoose.connection.close();
    process.exit(0);
  } catch (error) {
    console.log("Error in seed.js", error);
    process.exit(1);
  }
};

seedData();
