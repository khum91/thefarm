
import mongoose from "mongoose";
import { GeneralStatus } from "../constants";

const bannerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        min: 2
    },
    link: {
        type: String,
        required: false,
    },
    image: String,
    status: {
        type: String,
        enum: [...Object.values(GeneralStatus)],
        default: GeneralStatus.INACTIVE
    },
    createdBy: {
        type: String,
        ref: 'User',
        default: null
    }
}, {
    timestamps: true,
    autoCreate: true,
    autoIndex: true
})


const Banner = mongoose.models.banner || mongoose.model("banner", bannerSchema);
export default Banner;
