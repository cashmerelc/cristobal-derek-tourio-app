import dbConnect from "../../../db/dbconnect.js";
import Place from "../../../db/models/Place";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "GET") {
    const places = await Place.find();

    if (!request) {
      return response.status(404).json({ error: "Not Found" });
    }
    return response.status(200).json(places);
  }
  if (request.method === "POST") {
    try {
      const placeData = request.body;
      await Place.create(placeData);
      response.status(200).json({ status: "Place created!" });
    } catch (err) {
      console.log("POST Error: ", err);
      response.status(400).json({ error: err.message });
    }
  }
}
