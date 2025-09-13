import HotelCard from "./HotelCard"


function Hotels({hotels}) {
  return (
    <section className='py-10'>
        <h2 className='text-md md:text-2xl font-bold mb-5'>Hotel Recommended</h2>

        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5'>
            {
                hotels?.map((hotel, index) => (
                   <HotelCard  hotel={hotel} key={index}  />
                ))
            } 
        </div>

    </section>
  )
}

export default Hotels