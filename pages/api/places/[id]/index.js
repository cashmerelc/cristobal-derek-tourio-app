import dbConnect from "../../../../db/dbconnect.js";
import Place from "../../../../db/models/Place";

export default async function handler(request, response) {
  const { id } = request.query;
  console.log("id:", id);
  await dbConnect();

  if (!id) {
    return;
  }

  try {
    if (request.method === "GET") {
      const place = await Place.findById(id).populate("comments");
      console.log("Place ", place);
      if (!place) {
        return response.status(404).json({ status: "Not found" });
      }

      response.status(200).json({ place: place });
    }
    if (request.method === "PATCH") {
      await Place.findByIdAndUpdate(id, request.body);

      response.status(200).json({ status: `Place ${id} updated!` });
    }
    if (request.method === "DELETE") {
      await Place.findByIdAndDelete(id);
      response.status(200).json({ status: `Place ${id} deleted!` });
    }
  } catch (err) {
    console.error("Error:", err);
    response
      .status(500)
      .json({ status: "Internal Server Error", message: err.message });
  }
}
