import mongoose from "mongoose";

const conenctDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URL)
        console.log("DataBase connected")
    } catch (error) {
        console.log(error)
    }
}

export default conenctDB;