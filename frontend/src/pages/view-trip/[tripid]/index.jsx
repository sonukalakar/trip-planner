import InfoSection from '@/components/website/InfoSection';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Hotels from '../../../components/website/Hotels';
import Itinerary from '@/components/website/Itinerary';

function ViewTrip() {
    const {tripid} = useParams();
    const [tripData, setTripData] = useState([])

    const GetTripData = async()=> {
        if(!tripid) {
            return;
        }
        const response = await axios.get(`http://localhost:5000/api/trips/${tripid}`);
        const resData = await response.data;
        setTripData(resData.tripData.travelPlan)    
    }  

    useEffect(() => {
        GetTripData();
    },[tripid])

  return (
    <main className='p-10 md:px-24 lg:px-56 xl:px-60'>
            {/* Info Section */}
            <InfoSection trip={tripData} />
            {/* Hotels */}
            {tripData?.hotelOptions && <Hotels hotels={tripData?.hotelOptions} />}
            {/* trip plan */}
            {tripData?.itinerary && <Itinerary itinerary={tripData?.itinerary}/>}
            
    </main>
  )
}

export default ViewTrip