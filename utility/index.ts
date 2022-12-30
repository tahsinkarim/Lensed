import axios from "axios";
import jwt_decode from "jwt-decode";
import { User } from "../types";

export const createOrGetUser = async (response: any, addUser: any) => {
  const decoded: { name: string; picture: string; email: string } = jwt_decode(
    response.credential
  );

  const { name, picture, email } = decoded;

  const user: User = {
    name,
    email,
    avatar: picture,
  };

  addUser(user);

  await axios.post(`http://localhost:3000/api/auth`, user);
};
