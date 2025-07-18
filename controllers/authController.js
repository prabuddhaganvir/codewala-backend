import User from "../model/user.model.js";
import jwt from "jsonwebtoken";

export async function Signup(req, res) {
  const { name, password,role } = req.body;

  if (!name || !password ||!role) {
    return res.status(400).send("All fields are required");
  }

  if (password.length < 6) {
    return res.status(400).send("Password must be at least 6 characters long");
  }

  const existingUser = await User.findOne({ name });

  if (existingUser) {
       return res.status(400).json({
        success: false,
        message: "Invalid Creadentials",
      });
  }

  const newUser = await User.create({
    name,
    password: password,
    role,
  });
    if (!newUser) {
        return res.status(500).send("Error creating user");
    }

  const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "7d",
  });
  res.cookie("jwt", token, {
    httpOnly: true,
    sameSite: "strict", // prevent form CSRF attacks
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  });
  res.status(201).json({ success: true, user: newUser });
}



export async function Login(req, res) {
    
    try {
    const {name , password} = req.body;
       if (!name || !password) {
           return res.status(400).send("All fields are required");
       }
    
       const user = await User.findOne({ name });
        if (!user) {
             return res.status(400).send("Invalid credentials");
        }
    
         const isPasswordMatch = await user.matchPassword(password);
         if (!isPasswordMatch) {
             return res.status(400).send("Invalid credentials");
         }
    
                 // generating token
             const token = jwt.sign(
               { userId: user._id },
               process.env.JWT_SECRET_KEY,
               { expiresIn: "7d" }
             );
    
             res.cookie("jwt", token, {
               maxAge: 7 * 24 * 60 * 60 * 1000,
               httpOnly: true, //prevent from XSS attack
               sameSite: "strict", // prevent form CSRF attacks
               secure: process.env.NODE_ENV === "production", // set to true in production
             });
             res.status(200).json(
              {success:true, message:"Login Successfully",
              user}
            );
    
} catch (error) {
    console.error("Login error:", error);
    res.status(500).send("Internal server error");
  }
    
}

export async function Logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({message:"logout successfully", success:true})
}
