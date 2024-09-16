import mongoose from "mongoose";
import { GeneralStatus } from "@/data/constants";

const meatSchema = new mongoose.Schema({
    item: {
        type: mongoose.Types.ObjectId,
        ref: "minced",
        required: [true, "Please provide item detail"],
        unique: false
    },
    killdate: {
        type: Date,
        required: [true, "Please provide kill date"],
    },
    price: {
        type: Number,
        required: [true, "Please provide Price in rupees"],
    },
    status: {
        type: String,
        enum: [...Object.values(GeneralStatus)],
        default: GeneralStatus.ACTIVE
    },
}, {
    autoCreate: true,
    autoIndex: true
})
const Meat = mongoose.models.meat || mongoose.model("meat", meatSchema);
export default Meat;