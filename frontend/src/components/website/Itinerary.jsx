import React from 'react'
import Placecard from './Placecard'

function Itinerary({itinerary}) {
    console.log(itinerary)
  return (
   <section className='pb-10'>
        <h2 className='text-md md:text-2xl font-bold mb-5'>Itinerary</h2>

        <div className='space-y-3'>
            {Object.values(itinerary)?.map((item,index) => {
                        const checkPl = item.plan || item.plan || item.locations || item.places;
              return <div key={index} className='border rounded-xl border-gray-300 overflow-hidden'>
                        <h2 className='font-medium text-sm md:text-lg  bg-gray-300 p-4'>Day {index + 1}  <span>{}</span></h2>
                        {/* <p className='px-4 py-2 font-bold'>Best Time To Visit :{item?.bestTimeToVisit}</p> */}
                        <div className='p-4  '>
                        {
                            checkPl.map((place,index) => (
                                <Placecard place={place} key={index} />
                            ))
                        }
                    </div>
                   
                        
                
                </div>
            })}
        </div>

    </section>
  )
}

export default Itinerary