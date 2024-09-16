import mongoose from "mongoose";
import { Groups, Breeds, Colors } from '@/data/constants'

const aliveSchema = new mongoose.Schema({
    tag: {
        type: String,
        required: [true, "Please provide tagnumber"],
        unique: true,
    },
    group: {
        type: String,
        enum: [...Object.values(Groups)],
        required: [true, "Please provide group"],
    },
    breed: {
        type: String,
        enum: [...Object.values(Breeds)],
        required: [true, "Please provide breed name"],
    },
    color: {
        type: String,
        enum: [...Object.values(Colors)],
        required: [true, "Please provide color"],
    },
    age: {
        type: Number,
        required: [true, "Please provide age months"],
    },
    weight: {
        type: Number,
        required: [true, "Please provide minimun expected weight"],
    },
}, {
    autoCreate: true,
    autoIndex: true
})

const Alive =  mongoose.models.alive || mongoose.model("alive", aliveSchema);
export default Alive;