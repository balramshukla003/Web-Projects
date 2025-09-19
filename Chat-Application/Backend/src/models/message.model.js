import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
    {
        senderId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        receiverId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },
        text: {
            type: 'string',
        },
        image: {
            type: 'string',
        }
    },
    { timestamps: true }
);

const message = mongoose.model('message', messageSchema);
export default message;