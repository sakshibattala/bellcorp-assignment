import { Event } from "../models/event.model.js";
import { Registration } from "../models/registration.model.js";

export const eventRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const event = await Event.findOne({ _id: eventId });
    if (!event) return res.status(400).json({ message: "Event not found" });

    if (event.capacity <= 0)
      return res.status(400).json({ message: "Event is full" });

    const alreadyRegistered = await Registration.findOne({ userId, eventId });
    if (alreadyRegistered)
      return res.status(400).json({ message: "Already registered" });

    await Registration.create({ userId, eventId });

    event.capacity -= 1;
    await event.save();

    res.status(201).json({ message: "Registered successfully" });
  } catch (error) {
    console.log("Error in registering event", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const cancelRegistration = async (req, res) => {
  try {
    const { eventId } = req.params;
    const userId = req.user._id;

    const registration = await Registration.findOne({ eventId, userId });
    if (!registration)
      return res.status(400).json({ message: "Registration not found" });

    const event = await Event.findById(eventId);
    if (event) {
      event.capacity += 1;
      await event.save();
    }

    await Registration.deleteOne({ eventId, userId });

    res.status(200).json({ message: "Event registration cancelled" });
  } catch (error) {
    console.log("Error in registration cancel event", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const userRegistrations = async (req, res) => {
  try {
    const userId = req.user._id;
    const registrations = await Registration.find({ userId }).populate(
      "eventId",
    );

    res.status(200).json({ registrations });
  } catch (error) {
    console.log("Error in getting user registrations", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
