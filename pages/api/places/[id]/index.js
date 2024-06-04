import dbConnect from "../../../../db/dbconnect.js";
import Place from "../../../../db/models/Place";
import Comment from "../../../../db/models/Comment";

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
      if (!place) {
        return response.status(404).json({ status: "Not found" });
      }

      response.status(200).json({ place: place });
    }
    if (request.method === "PATCH") {
      console.log("Update place comment request body: ", request.body);
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
  if (request.method === "POST") {
    try {
      const commentData = request.body;
      console.log("New Comment request body: ", commentData);

      const createdComment = await Comment.create(commentData);
      // console.log("Created Comment response: ", createdComment);
      response.status(200).json({ status: "Comment created!" });
      await Place.findByIdAndUpdate(id, {
        $push: { comments: createdComment._id },
      });
    } catch (err) {
      console.log("POST Error: ", err);
      response.status(400).json({ error: err.message });
    }
  }
}
