import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../database/connectDatabase";
import {
  getUsers,
  postUser,
  putUser,
  deleteUser,
} from "../../../database/controller";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "GET":
      getUsers(req, res);
      break;
    case "POST":
      postUser(req, res);
      break;
    case "PUT":
      putUser(req, res);
      break;
    case "DELETE":
      deleteUser(req, res);
      break;
      res.status(200).json({ method, name: "DELETE Request" });
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
