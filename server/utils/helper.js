import jwt from "jsonwebtoken";
import { ENV } from "./env.js";

export const generateToken = (userId) => {
  try {
    const token = jwt.sign({ userId }, ENV.JWT_SECRET_KEY, { expiresIn: "7d" });
    return token;
  } catch (error) {
    console.log("Error in setting jwt token", error);
    throw new Error(error);
  }
};
