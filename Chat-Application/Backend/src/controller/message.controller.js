
import cloudinary from "../lib/cloudinary.js";
import message from "../models/message.model.js";
import User from "../models/user.model.js";

export const getAllUsers = async (req, res) => {
    try {
        const loggedInUserId = req.user.id;
        const filterUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        res.status(200).json(filterUsers);
    } catch (error) {
        console.error("Error getting users: ", error);
        res.status(500).json({ message: "Server error", error: error });
    }
}


export const getMesssages = async (req, res) => {
    try {
        const { id: userToChatId } = req.params;
        const myID = req.user.id;

        const messages = await message.find({
            $or: [
                { senderId: myID, receiverId: userToChatId },

                { senderId: userToChatId, receiverId: myID }
            ]
        })
        const allMessages = messages;

        res.status(200).json({
            messages: allMessages ? allMessages : 'No previous messages'
        });

    } catch (error) {
        console.error("Error getting messages: ", error);
        res.status(500).json({ message: "Server error" });
    }
}


export const sendMessage = async (req, res) => {
    try {
        const { text, image } = req.body;
        const { id: receiverId } = req.params;
        const senderId = req.user.id;

        let imageURL;

        if (image) {
            const uploadResponse = await cloudinary.uploader.upload(image);
            imageURL = uploadResponse.secure_url;
        }

        const newMessage = new message({
            senderId,
            receiverId,
            text,
            image: imageURL
        });

        await newMessage.save();

        //todo : realtime message

        res.status(201).json(newMessage);

    } catch (error) {
        console.error("Error sending message: ", error);
        res.status(500).json({ message: "Server error" });
    }
};


export const getActiveUsers = async (req, res) => { }