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

  if (request.method === "GET") {
    const place = await Place.findById(id);
    console.log(place);
    if (!place) {
      return response.status(404).json({ status: "Not found" });
    }

    response.status(200).json({ place: place });
  }
}

// const place = Place.find((place) => place._id.$oid === id);
// const comment = place?.comments;
// const allCommentIds = comment?.map((comment) => comment.$oid) || [];
// const comments = db_comments.filter((comment) =>
//   allCommentIds.includes(comment._id.$oid)
// );

// if (!place) {
//   return response.status(404).json({ status: "Not found" });
// }

// response.status(200).json({ place: place, comments: comments });
