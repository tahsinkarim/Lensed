// Controller
import { NextApiRequest, NextApiResponse } from "next";
import { type } from "os";
import Posts from "../model/post";
import Users from "../model/user";
import { User } from "../types";

//Get users
export async function getUsers(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    //Mongoose find all function
    const users: User[] = await Users.find({});

    //If collection is not found in database
    if (!users) return res.status(404).json({ error: "Data not found" });

    //Sending users as response
    res.status(200).json(users);
  } catch (error: any) {
    res.status(404).json({ error: "Error while fetching Data" });
  }
}

//Get single user
export async function getUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { userId } = req.query;
    if (userId) {
      //Mongoose find one function
      const user = await Users.findById(userId);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User not selected" });
  } catch (error) {
    res.status(404).json({ error: "Cannot get the User" });
  }
}

//Post users
export async function postUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const formData: User[] = req.body;
    if (!formData) return res.status(404).json({ error: "Data not Provided" });

    //Mongoose Create User
    Users.create(formData, function (err: any, data: User[]) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error: "Error while posting Data" });
  }
}

//Put users
export async function putUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { userId } = req.query;
    const formData: User[] = req.body;

    if (userId && formData) {
      const user = await Users.findByIdAndUpdate(userId, formData);
      res.status(200).json(user);
    }
    res.status(404).json({ error: "User not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error while Updating Data" });
  }
}

//Delete a user
export async function deleteUser(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { userId } = req.query;

    if (userId) {
      const user = await Users.findByIdAndDelete(userId);
      res.status(200).json({ deleted: userId });
    }
    res.status(404).json({ error: "User not selected" });
  } catch (error) {
    res.status(404).json({ error: "Error while Deleting Data" });
  }
}

//Get posts
export async function getPosts(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    //Mongoose find all function sorted by date
    const posts = await Posts.find({}).sort({ date: -1 });

    //Sending posts as response
    res.status(200).json(posts);
  } catch (error: any) {
    res.status(404).json({ error: "Error while fetching Posts" });
  }
}

//Post a Post
export async function postPost(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const formData = req.body;
    if (!formData) return res.status(404).json({ error: "Data not Provided" });

    //Mongoose Create User
    Posts.create(formData, function (err: any, data: any) {
      return res.status(200).json(data);
    });
  } catch (error) {
    res.status(404).json({ error: "Error while posting Data" });
  }
}

//Create new user
export async function getUserByEmail(
  req: NextApiRequest,
  res: NextApiResponse
): Promise<void> {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ error: "Email is required" });
    }

    const user = await Users.findOne({ email }).exec();
    if (user) return res.status(200).json(user);

    if (!user) {
      //create a new user
      const newUser = await Users.create(
        req.body,
        function (err: any, data: any) {
          return res.status(200).json(data);
        }
      );
    }
  } catch (error) {
    return res.status(404).json({ error: "Cannot get the User" });
  }
}
