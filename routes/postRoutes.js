import { getAllPosts, createPost, deletePost } from '../controllers/postController.js';
import { Router } from 'express';
import protect from '../middleware/protected.js';
import Post from '../model/post.model.js';

const router = Router();

router.get('/',getAllPosts);

router.post('/',protect,createPost);
// router.put('/:id', protect, editPost)
router.delete('/:id', deletePost)


// GET /profile/:userId
router.get('/profile/:userId', async (req, res) => {
  const { userId } = req.params;
//  console.log(userId)
  try {
    const usersPosts = await Post.find({ author: userId }); // Assuming 'author' is a reference to User
    res.json(usersPosts);
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
});


export default router;
