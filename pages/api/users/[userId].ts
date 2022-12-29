import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../database/connectDatabase";
import { getUser } from "../../../database/controller";
import Users from "../../../model/user";

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
      getUser(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
