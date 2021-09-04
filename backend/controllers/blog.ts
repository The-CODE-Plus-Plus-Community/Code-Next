import { Router } from 'express';
import { Blog } from "../models/blog";
import { User } from "../models/user";

const router = Router();

// deletes all blogs, for debugging
router.delete('/', async (req, res) => {
  try {
    const blogs = await Blog.deleteMany({});
    res.send(blogs);
  } catch(err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// get all blogs
router.get('/', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch(err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// get single blog
router.get('/:id', async (req, res) => {
  try {
		const blog = await Blog.findOne({ _id: req.params.id });
		res.send(blog);
	} catch {
		res.status(404);
		res.send({ error: "Blog doesn't exist!" });
	}
});

// post blog
router.post('/', async (req, res) => {
  try {
		const user: any = await User.findOne({ id: req.body.user_id });
    const blog: any = new Blog({
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      content: req.body.content,
    });

		user.blogs.push(blog._id);
		blog.user = user;
		await user.save();
    await blog.save();

    res.send(blog);
  } catch (err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// post comments
router.post('/:id/comment', async (req, res) => {
  try {
		const blog: any = await Blog.findOne({ _id: req.params.id });
		const { user_id, content } = req.body.comment;
		blog.comments.push({ user_id, content });

		await blog.save();

    res.send(blog);
  } catch (err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// post likes
router.patch('/:id/like', async (req, res) => {
  try {
		const blog: any = await Blog.findOne({ _id: req.params.id });
		const userId = req.body.user_id;

		const ifAlreadyLiked: string = blog.likes.find((id: string) => id === userId);
		if (ifAlreadyLiked) {
				const otherLikes = blog.likes.filter((id: string) => id !== ifAlreadyLiked);
				blog.likes = otherLikes;
		} else {
			blog.likes.push(userId);;
		}

		await blog.save();

    res.send(blog);
  } catch (err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// put blog
router.patch('/:id', async (req, res) => {
	try {
		const blog: any = await Blog.findOne({ _id: req.params.id });

		if (req.body.title) {
			blog.title = req.body.title;
		}

		if (req.body.content) {
			blog.content = req.body.content;
		}

		if (req.body.imgUrl) {
			blog.content = req.body.imgUrl;
		}

		await blog.save();
		res.send(blog);
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

// deletes a single blog
router.delete('/:id', async (req, res) => {
	try {
		await Blog.deleteOne({ _id: req.params.id });
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

export default router;
