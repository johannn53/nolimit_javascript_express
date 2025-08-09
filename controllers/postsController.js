const User = require('../models/user');
const Post = require('../models/post');

exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.findAll({ include: [{ model: User, as: 'author', attributes: { exclude: ['password'] } }] });
    return res.status(200).json({
      data: posts,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: null });
  }
};

exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id, { include: [{ model: User, as: 'author', attributes: { exclude: ['password'] } }] });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    return res.status(200).json({
      data: post,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: null });
  }
};

// CREATE POST
exports.createPost = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        message: 'Content are required',
      });
    }

    const post = await Post.create({ content: req.body.content, authorId: req.user.id });
    res.status(200).json({
      data: post,
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: null });
  }
};

// UPDATE POST
exports.updatePost = async (req, res) => {
  try {
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: null });
  }
  const { id } = req.params;
  const post = await Post.findByPk(id);

  if (!post) return res.status(404).json({ message: 'Post not found' });

  // VALIDATION FOR AUTHORIZATION USER ID LOGIN AND USER WHO POST
  if (post.authorId !== req.user.id) return res.status(403).json({ message: 'Not your post' });

  post.content = req.body.content || post.content;
  await post.save();
  return res.status(200).json({
    data: post,
  });
};

exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findByPk(req.params.id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    if (post.authorId !== req.user.id) return res.status(403).json({ message: 'Not your post' });

    await post.destroy();
    return res.status(200).json({
      message: 'Post deleted successfully',
    });
  } catch (error) {
    return res.status(500).json({ status: 500, message: 'Internal Server Error', data: null });
  }
};

exports.updatePost;
