import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Comment from "@/models/Comment";
import User from "@/models/User";

export async function GET(req, res) {
  await db.connect();
  const id = res.params.id;

  try {
    const comments = await Comment.find({ blogId: id }).populate("authorId");

    return new Response(JSON.stringify(comments), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function DELETE(req, res) {
  await db.connect();
  const id = res.params.id;

  const accessToken = req.headers.get("authorization");
  const token = accessToken.split(" ")[1];
  const decodedToken = verifyJwtToken(token);

  if (!accessToken || !decodedToken) {
    return new Response(
      JSON.stringify({ error: "unauthorized (wrong or expired token)" }),
      { status: 403 }
    );
  }
  try {
    const comments = await Comment.findById(id).populate("authorId");
    if (comments.authorId._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ message: "Only author can delete his blog" }),
        { status: 403 }
      );
    }

    await Comment.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Successfully deleted comment" }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
