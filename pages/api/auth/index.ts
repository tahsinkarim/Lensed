import type { NextApiRequest, NextApiResponse } from "next";
import connectMongo from "../../../database/connectDatabase";
import { getUserByEmail } from "../../../database/controller";
import { User } from "../../../types";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  connectMongo().catch(() =>
    res.status(405).json({ error: "Error in the connection" })
  );

  //Type of request
  const { method } = req;

  switch (method) {
    case "POST":
      getUserByEmail(req, res);
      break;
    default:
      res.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`Method ${method} not allowed`);
      break;
  }
}
