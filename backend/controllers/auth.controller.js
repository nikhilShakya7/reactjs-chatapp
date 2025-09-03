import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
export const signup = async (req, res) => {

  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;

    // Check password match
    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match" });
    }

    // Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Profile picture
    const boyProfilePicture = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePicture = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    // Create user
    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePicture:
        gender === "male" ? boyProfilePicture : girlProfilePicture,
    });
if(newUser){
    await newUser.save();

    // Respond with user data 
    res.status(201).json({
      _id: newUser._id,
      fullName: newUser.fullName,
      username: newUser.username,
      profilePicture: newUser.profilePicture,
    });}
    else{
      res.status(400).json({error:"Invalid user data"});
    }

  } catch (error) {
    console.error("Signup error:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
  export const login = (req, res) => { console.log("login"); res.send("User login"); };

export const logout = (req, res) => { console.log("logoutUser"); res.send("User logout"); };