import React, { useEffect, useState,useContext } from 'react'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete'
import { Input } from "@/components/ui/input"
import { SelectBudgetOptions, SelectTravelList } from '@/constants/options';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { aiModelRes } from '@/service/AIMODEL';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '@/constants/userContext';

function CreateTrip() {
    const [place, setPlace] = useState();
    const [formData,setFormData] = useState([]);
    const [loading,setLoading] = useState(false);
    const {setOpenDailog, userData} = useContext(UserContext);
    const navigate = useNavigate()

    const handleInputChange = (name,value) => {
        if(name==="noOfDays" && value > 5){
            alert("Please Enter Trip Days less than 5")
            return ;
        }
        setFormData({
            ...formData,
            [name] :  value
        })
    }

    useEffect(() => {
        // localStorage.getItem("user") ? 
      
        
    },[formData])



    const onGenerateTrip = async() => {
       const user =  localStorage.getItem("user");
       if(!user){
        setOpenDailog(true);
        return;
       }

        if(formData?.noOfDays > 5 || !formData?.location || !formData.traveler ||  !formData?.budget){
            toast.error('Please Fill All Details');
            return;
        }
        setLoading(true)
       
        const generatedTripData = await  aiModelRes(formData);
        const tripObjData = JSON.parse(generatedTripData)[0];
        const tripObjDataPlan = tripObjData.travelPlan;
        const authData = {userID : userData._id,userSelection : formData, travelPlan : tripObjDataPlan}
        const authDataStringyFy = JSON.stringify(authData)

        axios.post("http://localhost:5000/api/trips",authDataStringyFy,{
        headers: {
            "Content-Type": "application/json"
        }}).then((res) => {
           const resData = res;
           const tripId = resData.data._id;
           navigate("/view-trip/" + tripId)
        }).catch((err) => {
             console.error("❌ Error:", err);
        })
         setLoading(false)
    }


  return (
    <main className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10 max-w-[800px] mx-auto'>
        <h2 className='text-3xl font-bold '>Tell us your travel preferences</h2>
        <p className='mt-3 text-gray-500 text-xl'>Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.</p>

        <div className='mt-20 flex flex-col gap-10'>
            <div className='space-y-3'>
                <label className='text-xl my-3 font-medium '>What is destination of choice?</label>
                <GooglePlacesAutocomplete  apiKey={import.meta.env.VITE_GOOGLE_MAP_PLACE_API_KEY} 

                    selectProps={{
                        place,
                        onChange : (v) => {
                            setPlace(v); 
                            handleInputChange("location", v)
                        },
                        placeholder: "Search location..."
                    }}
                
                />
            </div>
            <div className='mt-2 space-y-3'>
                <label className='text-xl my-3 font-medium '>How many days are you planning your trip?</label>
                <Input  placeholder="Example : 3" type="number"
                    onChange={(e) => handleInputChange("noOfDays", e.target.value) }
                />
            </div>

            <div className='mt-5'>
               <label className='text-xl my-3 font-medium block'> What is Your Budget?</label>
               <div className='grid-cols-3 grid  gap-5'>
                    {
                        SelectBudgetOptions.map((item,index) =>(
                            <div key={index} className={`p-4 border rounded-lx hover:shadow-lg cursor-pointer ${formData?.budget == item.title && "border border-gray-400 shadow-lg"}`}
                                 onClick={(e) => handleInputChange("budget", item.title) }
                            
                            >
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <p className="font-bold text-lg">{item.title}</p>
                                <p className='text-sm text-gray-500'>{item.desc}</p>

                            </div>
                        ))
                    }
                    </div>
            </div>


             <div className='mt-5'>
               <label className='text-xl my-3 font-medium block'> Who do you plan on traveling with on your next adventure?</label>
               <div className='grid-cols-3 grid  gap-5'>
                    {
                        SelectTravelList.map((item,index) =>(
                            <div key={index} className={`p-4 border rounded-lx hover:shadow-lg cursor-pointer ${formData?.traveler == item.people && "border border-gray-400 shadow-lg"}`}

                             onClick={(e) => handleInputChange("traveler", item.people) }
                            
                            >
                                <h2 className='text-4xl'>{item.icon}</h2>
                                <p className="font-bold text-lg">{item.title}</p>
                                <p className='text-sm text-gray-500'>{item.desc}</p>

                            </div>
                        ))
                    }
                    </div>
            </div>

            <div className='my-4 text-end'>
                <Button onClick={onGenerateTrip}
                disabled={loading}
                >{loading ? <AiOutlineLoading3Quarters  className='h-7 w-7 animate-spin' />   : "Generate trip"}</Button>
            </div>

           
        </div>
    </main>
  )
}

export default CreateTrip