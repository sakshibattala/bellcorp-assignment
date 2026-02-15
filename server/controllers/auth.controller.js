import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { generateToken } from "../utils/helper.js";


export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (password.length < 6)
      return res
        .status(400)
        .json({ message: "Password must be 6 characters long" });

    const user = await User.findOne({ email });

    if (user) return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    return res
      .status(201)
      .json({
        message: "Signup successful",
        token: generateToken(newUser._id),
      });
  } catch (error) {
    console.log("Error in signup", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User doesn't exists" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);
    res.status(200).json({ message: "Login success", token, user });
  } catch (error) {
    console.log("Error in login", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
