import express from "express";
import morgan from "morgan";
import { Blog } from "./models/blog";
const PORT = process.env.PORT || 8000;
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("dev"));

// get all blogs
app.get('/blogs', async (req, res) => {
  try {
    const blogs = await Blog.find({});
    res.send(blogs);
  } catch(err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// get single blog
app.get('/blogs/:id', async (req, res) => {
  try {
		const blog = await Blog.findOne({ _id: req.params.id });
		res.send(blog);
	} catch {
		res.status(404);
		res.send({ error: "Blog doesn't exist!" });
	}
});

// post blog
app.post('/blogs', async (req, res) => {
  try {
    const blog = new Blog({
			user_id: req.body.user_id,
      title: req.body.title,
      imgUrl: req.body.imgUrl,
      content: req.body.content,
    });

    await blog.save();

    res.send(blog);
  } catch (err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// post comments
app.post('/blogs/:id/comment', async (req, res) => {
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
app.patch('/blogs/:id/like', async (req, res) => {
  try {
		const blog: any = await Blog.findOne({ _id: req.params.id });
		const user_id = req.body.user_id;

		const ifAlreadyLiked: string = blog.likes.find((id: string) => id === user_id);
		if (ifAlreadyLiked) {
				const otherLikes = blog.likes.filter((id: string) => id !== ifAlreadyLiked);
				blog.likes = otherLikes;
		} else {
			blog.likes.push(user_id);;
		}

		await blog.save();

    res.send(blog);
  } catch (err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// put blog
app.patch('/blogs/:id', async (req, res) => {
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

app.delete('/blogs/:id', async (req, res) => {
	try {
		await Blog.deleteOne({ _id: req.params.id });
		res.status(204).send();
	} catch {
		res.status(404);
		res.send({ error: "Post doesn't exist!" });
	}
});

app.listen(PORT, () => {
  // tslint:disable-next-line:no-console
  console.log('listening at port:', PORT);
});


// JSON-FORMAT
// [
// 	{
// 			"_id": "612e3cd15fcc4f0cd62e452d",
// 			"user_id": "jksafbjasfb",
// 			"title": "sidmohanty11",
// 			"imgUrl": "sanfjasbfjsb",
// 			"content": "safjknaslfas;fmlsanf;lasn",
// 			"likes": ["lkasfnkalsnfkas"],
// 			"comments": [
// 					{
// 							"user_id": "jksafbjasfb",
// 							"content": "slklafnlkasnflka",
// 							"_id": "612e3fcf19ef75c0e8be0602"
// 					}
// 			],
// 			"__v": 1
// 	}
// ]