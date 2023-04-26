import mongoose from "mongoose";
import { Transection } from "./transectionInterface";

const transectionSchema = new mongoose.Schema<Transection>({
    userid: {
        type: String,
        required: true
    },
   amount:{
    type: Number,
    required: [true,'Amount is required.']
   },
   type: {
    type: String,
    required: [true, 'Type is required.']
   },
   category:{
       type: String,
       required: [true,'Category is required.']
   },
   refrence: {
    type: String
   },
   description: {
    type: String,
    required: [true, 'Description is required']
   },
   date: {
    type: String,
    required: [true, 'date is required']
   }
},{timestamps: true});

const TransectionModel = mongoose.model<Transection>("Transection", transectionSchema);

export { TransectionModel };
