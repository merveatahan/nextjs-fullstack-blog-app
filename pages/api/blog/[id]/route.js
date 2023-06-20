//https://www.youtube.com/watch?v=DWSmrdwyoN8  dk: 58:30
import db from "@/lib/db";
import { verifyJwtToken } from "@/lib/jwt";
import Blog from "@/models/Blog";
import User from "@/models/User";

export async function GET(req, res) {
  await db.connect();
  const id = res.params.id;
  try {
    const blog = await Blog.findById(id)
      .populate("authorId")
      .select("-password");

    return new Response(JSON.stringify(blog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}

export async function PUT(req, res) {
  await db.connect();
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
    const body = await req.json();
    const blog = await Blog.findById(id).populate("authorId");

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ message: "Only author can update his blog" }),
        { status: 403 }
      );
    }

    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { $set: { ...body } },
      { new: true }
    );

    return new Response(JSON.stringify(updatedBlog), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
export async function DELETE(req) {
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
    const blog = await Blog.findById(id).populate("authorId");

    if (blog?.authorId?._id.toString() !== decodedToken._id.toString()) {
      return new Response(
        JSON.stringify({ message: "Only author can delete his blog" }),
        { status: 403 }
      );
    }
    await Blog.findByIdAndDelete(id);

    return new Response(
      JSON.stringify({ message: "Successfully deleted blog" }),
      {
        status: 200,
      }
    );
  } catch (error) {
    return new Response(JSON.stringify(null), { status: 500 });
  }
}
// oluşacak link : http://localhost:3000/api/blog/someId
