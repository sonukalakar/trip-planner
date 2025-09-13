import mongoose from "mongoose";


// schema generate
const tripMod = new mongoose.Schema({
    userID : {type : String, required : true},
    travelPlan : { type : Object, required : true },
    userSelection : {type : Object, required : true}

},{
    timestamps : true
})

// Create the model
// const TripModel = mongoose.model("Trips", new mongoose.Schema({},{ timestamps: true }));
const TripModel = mongoose.model("Trips", tripMod);



export default TripModel