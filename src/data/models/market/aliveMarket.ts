import mongoose from "mongoose";
import { GeneralStatus } from "@/data/constants";
const aliveMarketSchema = new mongoose.Schema({
    tag: {
        type: mongoose.Types.ObjectId,
        ref: "alive",
        required: [true, "Please provide tag number"],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, "Please provide Price in rupees"],
    },
    image: String,
    status: {
        type: String,
        enum: [...Object.values(GeneralStatus)],
        default: GeneralStatus.ACTIVE
    },
}, {
    autoCreate: true,
    autoIndex: true
})

const aliveMarket = mongoose.models.aliveMarket || mongoose.model("aliveMarket", aliveMarketSchema);

export default aliveMarket;