import { Router } from 'express';
import { User } from "../models/user";

const router = Router();

// for debugging only
router.get('/', async (req, res) => {
  try {
		const users = await User.find({});
		res.send(users);
	} catch {
		res.status(404);
		res.send({ error: "User doesn't exist!" });
	}
});

// for debugging, delete all users
router.delete('/', async (req, res) => {
  try {
		const users = await User.deleteMany({});
		res.send(users);
	} catch {
		res.status(404);
		res.send({ error: "User doesn't exist!" });
	}
});

// get user data
router.get('/:id', async (req, res) => {
  try {
		const user = await User.findOne({ id: req.params.id });
		res.send(user);
	} catch {
		res.status(404);
		res.send({ error: "User doesn't exist!" });
	}
});

// post user
router.post('/', async (req, res) => {
  try {
    const user = new User({
			id: req.body.id,
      email: req.body.email,
    });

    await user.save();

    res.send(user);
  } catch (err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// add bio
router.patch('/bio/:id', async (req, res) => {
  try {
		const user: any = await User.findOne({ id: req.params.id });
		user.bio = req.body.bio;
		await user.save();

    res.send(user);
  } catch (err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// follow req
router.patch('/follow/:id', async (req, res) => {
  try {
    const idOfUserWhoWantsToFollow: string = req.params.id;
    const idOfUserWhoGetsFollowed: string = req.body.id;
		const userFollower: any = await User.findOne({ id: idOfUserWhoWantsToFollow });
		const userWhoGetsFollowed: any = await User.findOne({ id: idOfUserWhoGetsFollowed });

		const ifAlreadyFollowed: string = userFollower
      .following.find((id: string) => id === idOfUserWhoGetsFollowed);

		if (ifAlreadyFollowed) {
				userFollower.following = userFollower.following.filter((id: string) => id !== idOfUserWhoGetsFollowed);
        userWhoGetsFollowed.followers = userWhoGetsFollowed.followers.filter((id: string) => id !== idOfUserWhoGetsFollowed);
		} else {
			userFollower.following.push(idOfUserWhoGetsFollowed);
      userWhoGetsFollowed.followers.push(idOfUserWhoGetsFollowed);
		}

		await userFollower.save();
		await userWhoGetsFollowed.save();

    res.send(userFollower);
  } catch (err) {
    res.status(500);
		res.send({ error: "Internal Server Error!" });
  }
});

// put bookmark
router.patch('/:user_id/bookmark', async (req, res) => {
	try {
		const blogId= req.body.id;
		const user: any = await User.findOne({ id: req.params.user_id });
    const ifPresent = user.bookmarks.find((id: string) => id === blogId);

    if (ifPresent) {
      user.bookmarks.filter((id: string) => id !== ifPresent);
    } else {
      user.bookmarks.push(blogId);
    }
		await user.save();
		res.send(user);
	} catch {
		res.status(500);
		res.send({ error: "Internal Server Error!" });
	}
});

export default router;
