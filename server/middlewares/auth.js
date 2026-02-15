import jwt from "jsonwebtoken";
import { ENV } from "../utils/env.js";
import { User } from "../models/user.model.js";

//You know which user is making request
// You can fetch only their data
export const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) return res.status(401).json({ message: "Not authorized" });

    const decoded = jwt.verify(token, ENV.JWT_SECRET_KEY);

    const user = await User.findById(decoded.userId).select("-password");
    if (!user) return res.status(401).json({ message: "User not found" });

    req.user = user;

    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
