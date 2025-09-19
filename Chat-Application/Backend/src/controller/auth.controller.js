import cloudinary from "../lib/cloudinary.js";
import generateToken from "../jwt/generateToken.js";
import User from "../models/user.model.js";

export const signup = async (req, res) => {
    const { fullName, email, password, phone } = req.body;
    try {
        // validation
        if (!fullName || !email || !password || !phone) {
            console.log("Please provide all required fields");
            return res.status(400).json({ message: "Please provide all required fields" });
        }

        if (password.length < 6) {
            console.log("Password must be at least 6 characters")
            return res.status(400).json({ message: "Password must be at least 6 characters" });
        }

        const user = await User.findOne({
            $or: [
                { email: email },
                { phone: phone }
            ]
        });

        if (user) {
            if (user.email === email) {
                console.log({ message: "User already exists with this email" })
                return res.status(400).json({ message: "User already exists with this email" });
            } else if (user.phone === phone) {
                console.log({ message: "User already exists with this phone" })
                return res.status(400).json({ message: "User already exists with this phone" });
            }
        }


        const newUser = new User({
            fullName: fullName,
            email: email,
            phone: phone,
            password: password,
        });

        if (newUser) {
            await newUser.save();
            res.status(201).json({
                message: "User registered successfully",
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                phone: newUser.phone,
                profilePic: newUser.profilePic,
            });
        } else {
            res.status(400).json({ message: "Invalid user data" });
        }
    } catch (err) {
        console.error("auth.controller signup:", err);
        res.status(500).json({ message: "Server error" });
    }
};

export const login = async (req, res) => {

    const { emailOrPhone, password } = req.body;

    if (!emailOrPhone || !password) {
        return res.status(403).json({ message: "Please provide a valid email or password" });
    }

    try {
        const user = await User.findOne({
            $or: [
                { email: emailOrPhone },
                { phone: emailOrPhone }
            ]
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        if (user.password !== password) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const userData = {
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            profilePic: user.profilePic,
        }

        const token = await generateToken(userData);

        res.json({
            id: user._id,
            fullName: user.fullName,
            email: user.email,
            phone: user.phone,
            profilePic: user.profilePic,
            token: token,
        });
    } catch (error) {
        console.error("auth.controller login:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const updateProfile = async (req, res) => {
    try {
        const { profilePic } = req.body;
        const userId = req.user_id; // Fixed: userID → userId for consistency

        if (!profilePic) {
            return res.status(400).json({ message: "Please provide profile picture" });
        }

        const uploadResponse = await cloudinary.uploader.upload(profilePic);

        const updatedUser = await User.findByIdAndUpdate(userId, { profilePic: uploadResponse.secure_url }, { new: true }); // Fixed: updateUser → updatedUser

        res.status(200).json({ user: updatedUser });
    } catch (error) {
        console.error("auth.controller updateProfile:", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const checkAuth = async (req, res) => {
    try {
        res.status(200).json({
            message: 'Token is valid',
            data: req.user,
        });
    } catch (error) {
        console.error("auth.controller checkAuth: ", error);
        res.status(500).json({ message: "Server error" });
    }
}

export const allUsers = async (req, res) => { }