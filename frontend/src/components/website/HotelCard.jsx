import { IoLocationSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import {GetPlaceDetails} from "@/service/GlobalApi";

function HotelCard({hotel}) {
    const [photoUrl, setPhotoUrl] = useState("")

      useEffect(() => {
        getPhoto()
      },[hotel])

    const getPhoto = async() => {
    const heroPhoto = await  GetPlaceDetails(hotel?.hotelName)
    setPhotoUrl(heroPhoto);
    }

  return (
     <Link  to={`https://www.google.com/maps/search/?api=1&query=` + hotel?.hotelName + "," + hotel?.hotelAddress} target="_blank" className="space-y-3 hover:scale-102 transition-all cursor-pointer">
        <img src={photoUrl}  alt="" className="w-full h-[150px] rounded-xl"/>
        <h2 className='font-medium text-sm md:text-lg'>{hotel?.hotelName}</h2>
        <p className='text-xs text-gray-500 space-x-1 flex items-center'><IoLocationSharp /> {hotel?.hotelAddress}</p>
        <p className='text-sm font-medium'> {hotel?.price}</p>
        <p className='text-xs text-gray-500'> {hotel?.rating}</p>
    </Link>
  )
}

export default HotelCard