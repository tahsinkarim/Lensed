import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../database/connectDatabase";
import { getPosts, postPost } from "../../../database/controller";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getPosts(req, res);
      break;
    case "POST":
      postPost(req, res);
      break;
    case "PUT":
      res.status(200).json({ method, name: "put post" });
      break;
    case "DELETE":
      res.status(200).json({ method, name: "Delete post" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
