import express, { json } from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import TripModel from "./models/TripsModel.js";
import userModel from "./models/UserModel.js";

// DB connected
connectDB();

// initialize express
const app = express()

// Middleware
app.use(express.json());

app.use(cors()) //enable cross origin resource sharing

// get Data
app.get("/", (req,res) => res.send("API is Fine"))


// post Trip Data
app.post("/api/trips", async(req, res) => {
    // console.log("request", req)
    try{
        const tripDate =   await TripModel.create(req.body)
        res.status(200).json(tripDate);

    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})

// get Trip Data
app.get("/api/trips/:id",  async (req, res) => {
    try{
        const tripId = req.params.id;
        const tripData =   await TripModel.findById(tripId)
        // res.send(tripData)
        res.status(200).json({message : "Trip Data Fetched!!", tripData});
    }
    catch(error){
        res.status(500).json({message : error.message})
    }
})


// Post User Data
app.post("/api/register", async (req,res) => {
    const {username, email, password} = req.body;
    //check user already exits by email id 
    const existUser = await userModel.findOne({email})
    if(existUser){
        return res.status(400).json({message : "User already exist!!"})
    }
    try{
        const result = await userModel.create(req.body)
        res.status(200).json({message :"Data Submitted", userData : result})
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})

//Login User Data
app.post("/api/login", async (req,res) => {
    console.log(req.body)
    const {email, password} = req.body;
    
    try{
        // check user exist
        const verifyUser = await userModel.findOne({email});
        if(verifyUser){
            const verifyCredentials =  await userModel.findOne({email, password});
            verifyCredentials ? 
            res.status(200).json({message: "SuccessFully Login", user : verifyCredentials}) 
            :
            res.status(400).json({message: "Credentials are wrong!!"}) ;
        }else{
            res.status(400).json({message: "User Not Exist"})
        }
    }
    catch(error){
        res.status(500).json({message: error.message})
    }
})


const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log("Server is working on 5000"))