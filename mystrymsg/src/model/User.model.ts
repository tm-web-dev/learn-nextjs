import mongoose, {Schema, Document} from "mongoose";

// Message Interface
export interface Message extends Document {
    content: string;
    createdAt: Date
}

//Message Schema
const MessageSchema = new Schema<Message>({
    content: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now
    }
}) 

//Message Interface
export interface User extends Document {
    username: string;
    email: string;
    password: string;
    verifyCode: string;
    verifyCodeExpiry: Date;
    isVerified: boolean;
    isAcceptingMessages: boolean;
    messages: Message[];
}

//User Schema
const UserSchema = new Schema<User>({
    username: {
        type: String,
        required: [true, "Please provide a username"],
        trim: true,
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please provide a Email"],
        unique: true,
        match:[/^\S+@\S+\.\S+$/, "Please provide a valid email"]
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
    },
    verifyCode: {
        type: String,
        required: [true, "Please provide a verification code"]
    },
    verifyCodeExpiry: {
        type: Date,
        required: [true, "Please provide a verification code expiry date"]
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    isAcceptingMessages: {
        type: Boolean,
        default: true
    },
    messages: [MessageSchema]
})

const UserModel = mongoose.Model<User> || mongoose.model<User>("User", UserSchema);

export default UserModel;