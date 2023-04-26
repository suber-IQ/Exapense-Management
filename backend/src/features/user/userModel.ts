import mongoose from "mongoose";
import { User } from "./userInterface";

const userSchema = new mongoose.Schema<User>({
   name: {
    type: String,
    required: [true, 'Name is required.']
   },
   email: {
    type: String,
    required: [true, 'Email is required.'],
    unique: true
   },
   password: {
    type: String,
    required: [true, 'Password is required.']
   }
},{timestamps: true});

const UserModel = mongoose.model<User>("User", userSchema);

export { UserModel };
