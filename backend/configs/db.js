import mongoose from "mongoose";

const connectDB =  async() => {

    try{
       await mongoose.connect(`${process.env.DB_URI}/Trip-Planner`);

       mongoose.connection.on("connected", () => {
            console.log("DB Connected")
       })
       mongoose.connection.on("error", () => { 
            console.log("DB Not Connected!!")
       })
    }
    catch (error) {
        console.log(error);
        process.exit(1);
    }
}

export default connectDB;