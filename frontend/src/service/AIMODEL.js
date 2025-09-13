import {GoogleGenAI} from '@google/genai';
const GEMINI_API_KEY = import.meta.env.VITE_GOOGLE_GEMINI_API;

const ai = new GoogleGenAI({apiKey: GEMINI_API_KEY});
// Converts local file information to a Part object.
function fileToGenerativePart(path, mimeType) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}


export const aiModelRes = async function main({location,noOfDays,traveler,budget}) {

  const response = await ai.models.generateContent({
    model: 'gemini-2.0-flash-001',
     config: {
     responseMimeType: "application/json",
     },
    contents: `Generate Travel Plan for location: ${location.label} for ${noOfDays} Days for ${traveler} with a ${budget} budget, Give me a Hotels options list with Hotel Name, Hotel address, Price, hotel image url, geo coordinates and suggest itinerary with placename, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time travel each of the location ${noOfDays} days with each day plan with best time to visit in JSON format`,
  });
  return response.text.trim();
}

