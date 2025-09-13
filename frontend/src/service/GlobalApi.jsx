import axios from "axios"

const BASE_URL = 'https://places.googleapis.com/v1/places:searchText';

const config = {
    headers : {
        'Content-Type' : 'application/json',
        'X-Goog-Api-Key' : import.meta.env.VITE_GOOGLE_MAP_PLACE_API_KEY,
        'X-Goog-FieldMask' : [
            'places.photos',
            'places.displayName',
            'places.id'
        ]
    }
}

export const PHOTO_REF_URL = "https://places.googleapis.com/v1/{Name}/media?maxHeightPx=1000&maxWidthPx=400&key=" + import.meta.env.VITE_GOOGLE_MAP_PLACE_API_KEY;

export const GetPlaceDetails = async (loc) =>  {
    const data = {
        textQuery:loc,
      }
      const res = await  axios.post(BASE_URL,data,config);
      
      return  PHOTO_REF_URL.replace('{Name}',res.data.places[0].photos[3].name)

}

