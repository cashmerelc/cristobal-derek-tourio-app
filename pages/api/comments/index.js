import dbConnect from "../../../db/dbconnect.js";
import Comment from "../../../db/models/Comment";

export default async function handler(request, response) {
  await dbConnect();

  if (request.method === "POST") {
    try {
      const commentData = request.body;
      await Comment.create(commentData);
      response.status(200).json({ status: "Comment created!" });
    } catch (err) {
      console.log("POST Error: ", err);
      response.status(400).json({ error: err.message });
    }
  }
}
