import mongoose from "mongoose";


const visitListSchema = new mongoose.Schema({
    ip: {
        type: String,
    },
    device: {
        type: String,
    },
    clickedAt: {
        type: String,
    },
    language: {
        type: String,
    }
},{_id: false})

const urlSchema = new mongoose.Schema({
    shortId: {
        type: String,
        required: true,
        unique: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    redirectUrl: {
        type: String,
        required: true,
    },
    visitList: [visitListSchema],
    isActive: {
        type: Boolean,
        default: true
    }
}, { timestamps: true })    

export default mongoose.model("Url", urlSchema);