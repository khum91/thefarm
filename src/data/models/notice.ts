import mongoose from "mongoose";
import { GeneralStatus } from "@/data/constants";

const noticeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter Name"],
    },
    date: {
        type: Date,
        required: [true, "Please provide expiray date"],
    },
    message: {
        type: String,
        required: [true, "Please enter Message"],
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
const Notice = mongoose.models.notice || mongoose.model("notice", noticeSchema);

export default Notice;



