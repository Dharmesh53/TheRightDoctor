import mongoose from "mongoose";
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        trim: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        required: true,
        enum: ["Male", "Female"],
    },
    mobile_number: {
        type: String,
        required: true,
        match: /^[0-9]{10}$/,
    },
});
export const Person = mongoose.model("Person", personSchema);
