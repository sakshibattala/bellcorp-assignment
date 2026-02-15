import { Event } from "../models/event.model.js";

export const getAllEvents = async (req, res) => {
  try {
    const {
      search = "",
      category,
      location,
      startDate,
      endDate,
      page = 1,
      limit = 6,
    } = req.query;

    const query = {};

    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    if (category) query.category = category;
    if (location) query.location = location;

    if (startDate || endDate) {
      query.date = {};
      if (startDate) query.date.$gte = new Date(startDate);
      if (endDate) query.date.$lte = new Date(endDate);
    }

    const skip = (page - 1) * limit;

    const total = await Event.countDocuments(query);

    const events = await Event.find(query)
      .sort({ date: 1 })
      .skip(skip)
      .limit(Number(limit));

    res.status(200).json({
      events,
      totalPages: Math.ceil(total / limit),
      currentPage: Number(page),
    });
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEventById = async (req, res) => {
  try {
    const { id } = req.params;
    const event = await Event.findOne({ _id: id });

    if (!event) res.status(400).json({ message: "Event not found" });

    res.status(200).json({ event });
  } catch (error) {
    console.log("Error in getting event", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
