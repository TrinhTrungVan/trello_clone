import mongoose from "mongoose";

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://localhost:27017/trello_clone");
        console.log("Connect successfully!");
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
