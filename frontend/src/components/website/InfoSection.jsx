import { CiCalendarDate } from "react-icons/ci";
import { PiCurrencyInrBold } from "react-icons/pi";
import { FaUser } from "react-icons/fa";
import { BsFillSendFill } from "react-icons/bs";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import {GetPlaceDetails} from "@/service/GlobalApi";

function InfoSection({trip}) {
  const [photoUrl, setPhotoUrl] = useState("")
  useEffect(() => {
    getPhoto()
  },[trip])

  const getPhoto = async() => {
    const heroPhoto = await  GetPlaceDetails(trip?.location)
    setPhotoUrl(heroPhoto);
  }

  return (
    <section>
       <img  src={photoUrl} className='w-full rounded-xl max-h-[450px]' />

        <h1 className='mt-6 font-bold text-xl md:text-3xl mb-4'>{trip?.location}</h1>
        <div className="flex justify-between">
            
            <div className='flex flex-wrap gap-5'>
                <span className='inline-flex gap-2 bg-gray-200 px-3 font-medium py-1 rounded-full items-center  text-gray-800 text-sm'>
                    <CiCalendarDate /> {trip?.duration}
                </span>
                <span className='inline-flex gap-2 bg-gray-200 px-3 font-medium py-1 rounded-full items-center  text-gray-800 text-sm'>
                <PiCurrencyInrBold /> {trip?.budget}
                </span>
                <span className='inline-flex gap-2 bg-gray-200 px-3 font-medium py-1 rounded-full items-center  text-gray-800 text-sm'>
                <FaUser /> {trip?.travelers} Traveler
                </span>
            </div>
            <Button><BsFillSendFill /></Button>
        
        </div>
    </section>
  )
}

export default InfoSection