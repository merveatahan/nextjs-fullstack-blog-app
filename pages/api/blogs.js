import { mongooseConnect } from "@/lib/mongoose";
import { Blog } from "@/models/Blog";
import { Comment } from "@/models/Comment";
import { verifyJwtToken } from "@/lib/jwt";

export default async function handler(req, res) {
  const { method } = req;
  await mongooseConnect();

  const accessToken = req.headers.authorization;
  const token = accessToken?.split(" ")[1];

  const decodedToken = verifyJwtToken(token);

  if (method === "GET") {
    if (req.query.id) {
      try {
        const blog = await Blog.findById(req.query.id).populate("comments");
        res.json(blog);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    } else {
      try {
        const blogs = await Blog.find();
        res.json(blogs);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }

  if (method === "POST") {
    const { title, description, imageUrl, authorId, commentText } = req.body;

    try {
      if (!accessToken || !decodedToken) {
        throw new Error("Lütfen giriş yapınız");
      } else {
        const blog = await Blog.create({
          title,
          description,
          imageUrl,
          authorId,
        });

        const comment = await Comment.create({
          blogId: blog._id,
          authorId,
          text: commentText,
        });

        blog.comments.push(comment._id);
        await blog.save();

        res.json(blog);
      }
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  if (method === "PUT") {
    const { title, description, imageUrl, authorId, _id } = req.body;

    try {
      if (!accessToken || !decodedToken) {
        throw new Error("Lütfen giriş yapınız");
      } else {
        await Blog.updateOne(
          { _id },
          {
            title,
            description,
            imageUrl,
            authorId,
          }
        );
        res.json(true);
      }
    } catch (error) {
      res.status(403).json({ error: error.message });
    }
  }

  if (method === "DELETE") {
    if (req.query?.id) {
      try {
        await Blog.deleteOne({ _id: req.query?.id });
        await Comment.deleteMany({ blogId: req.query?.id });
        res.json(true);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
  }
}
