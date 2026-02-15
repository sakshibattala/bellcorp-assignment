import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    organizer: { type: String, required: true },
    location: { type: String, required: true },
    date: { type: Date, required: true },
    description: { type: String, required: true },
    capacity: { type: Number, required: true },
    category: { type: String, required: true },
  },
  { timestamps: true },
);

export const Event = mongoose.model("Event", eventSchema);
//Event Schema: Name, organizer, location, date, description, capacity, and category.
