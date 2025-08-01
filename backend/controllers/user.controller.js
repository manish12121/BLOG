import { User } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken"
import getDataUri from "../utils/dataUri.js"
import cloudinary from "../utils/cloudinary.js";
import dotenv from "dotenv";
dotenv.config();

export const register = async(req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        // Check for missing fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Basic email regex validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                success: false,
                message: "Invalid email format",
            });
        }

        // Password length check
        if (password.length < 6) {
            return res.status(400).json({
                success: false,
                message: "Password must be at least 6 characters long",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
        });

        return res.status(201).json({
            success: true,
            message: "Account created successfully",
        });

    } catch (error) {
        console.error("Registration error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to register",
        });
    }
};


export const login = async(req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "All fields are required",
            });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "Incorrect email or password",
            });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials",
            });
        }

        const token = jwt.sign({ userId: user._id },
            process.env.SECRET_KEY, { expiresIn: "1d" }
        );

        return res
            .status(200)
            .cookie("token", token, {
                maxAge: 1 * 24 * 60 * 60 * 1000, // 1 day
                httpOnly: true,
                sameSite: "strict",
                secure: process.env.NODE_ENV === "production",
            })
            .json({
                success: true,
                message: `Welcome back ${user.firstName}`,
                user,
            });

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({
            success: false,
            message: "Failed to login",
        });
    }
};

export const logout = async(__dirname, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            success: true,
            message: "Logout successfully"
        })
    } catch (error) {
        console.log(error)
    }
}

export const updateProfile = async(req, res) => {
    try {
        const userId = req.id
        const { firstName, lastName, occupation, bio, instagram, facebook, linkedin, github } = req.body;
        const file = req.file;

        const user = await User.findById(userId).select("-password")
        let cloudResponse;
        if (file) {
            const fileUri = getDataUri(file);
            cloudResponse = await cloudinary.uploader.upload(fileUri);
            user.photoUrl = cloudResponse.secure_url;
        }



        if (!user) {
            return res.status(404).json({
                message: "User not found",
                success: false
            })
        }

        //Updating data
        if (firstName) user.firstName = firstName
        if (lastName) user.lastName = lastName;
        if (occupation) user.occupation = occupation
        if (instagram) user.instagram = instagram
        if (facebook) user.facebook = facebook
        if (linkedin) user.linkedin = linkedin
        if (github) user.github = github
        if (bio) user.bio = bio
        if (file) user.photoUrl = cloudResponse.secure_url

        await user.save();
        return res.status(200).json({
            message: "Profile updated successfully",
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "failed to upload the profile"
        })
    }
}