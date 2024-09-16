import mongoose from "mongoose";

const mincedSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide item name"],
        unique: true,
    },
    part: {
        type: String,
        required: [true, "Please provide part"],
    },
    unit: {
        type: String,
        required: [true, "Please provide mesuring unit"],
    },
    life: {
        type: Number,
        required: [true, "Please provide life days"],
    },
    image: String,
}, {
    autoCreate: true,
    autoIndex: true
})
const Minced = mongoose.models.minced || mongoose.model("minced", mincedSchema);

export default Minced;