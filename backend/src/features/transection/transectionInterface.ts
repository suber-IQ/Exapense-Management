import mongoose from "mongoose";

export interface Transection extends mongoose.Document {
    userid: string;
    amount: number;
    type: string;
    category: string;
    refrence?: string;
    description: string;
    date: string
}
  

