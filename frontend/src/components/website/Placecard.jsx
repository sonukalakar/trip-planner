import { GetPlaceDetails } from '@/service/GlobalApi';
import React, { useEffect, useState } from 'react'

function Placecard({place}) {
    const [photo,setPhoto] = useState("");

    useEffect(()=>{
        GetPhoto()
    },[place]);
    const GetPhoto = async () => {
        const result = await GetPlaceDetails(place?.placeName);
        setPhoto(result)
    }

   return (
    <div className='flex border-b-1 py-2 last:border-0 gap-4'>
        <img src={photo} alt={place?.placeName} className='w-[100px] h-[100px] rounded-xl'/>
        <div>
            <div className='font-medium text-md'>{place?.placeName}</div>
            <p className='text-sm text-gray-600'>{place?.placeDetails}</p>
            <p className='bg-gray-300 rounded-full text-xs py-1 px-2 mt-1 inline-block font-medium'>Travel Time : {place?.travelTime}</p>
            {/* <span className='bg-gray-300 rounded-full text-xs py-1 px-2 mb-2 inline-block font-medium'>Rating {place?.rating}</span> */}
        </div>
    </div>
  )
}

export default Placecard