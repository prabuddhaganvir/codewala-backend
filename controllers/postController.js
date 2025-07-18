import Post from "../model/post.model.js";
import mongoose from "mongoose";

export async function getAllPosts(req, res) {
      try {
        const posts = await Post.find()
        .populate('author', 'name')
        .sort({ createdAt: -1 });
        res.status(200).json({ success: true, posts });
      } catch (error) {
        config.error("Error fetching posts:", error);
        res.status(500).json({ success: false, message: "Internal server error" });
      }
}
export async function createPost(req, res) {
    try {
        const {title, content} = req.body;

        if (!title || !content) {
            return res.status(400).json({ success: false, message: "All fields are required" });
        }
        const newPost = await Post.create({
            title,
            content,
            author: req.user._id,
        });
        res.status(201).json({
  message: "Post created successfully",
  success:true,
  post: newPost
});
        
    } catch (error) {
         res.status(500).json({ message: 'Failed to create post' });
         console.error("Error creating postController:", error);
    }
}

export async function deletePost(req, res) {
        const {id} = req.params;
     
   try {

       if (!mongoose.Types.ObjectId.isValid(id)) {
         return res.status(400).json({ message: 'Invalid ID format' });
     }
   
    const del = await Post.findByIdAndDelete(id)
    if (!del) {
      console.log("Error While deleting")
      res.status(404).json({ message: "Post not found", success: false });
       return;
    }
    res.status(200).json({message:"Post Delete Successfull", success:true})
   } catch (error) {
    console.log("Error in deletePost Controller", error)
    res.status(500).json({message:"Internal server Error", success:false})
   }
}