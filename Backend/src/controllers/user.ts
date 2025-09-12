import bcrypt from "bcrypt";
import { UserModel } from "../models/User";
import { jwtHelper } from "../helpers/token";

//register
export async function register(login: string, password: string) {
  if (!password) {
    throw new Error("Password is Empty");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await UserModel.create({ login, password: passwordHash });
  const token = jwtHelper.generate({ userId: user.id });

  return { user, token };
}

//login
export async function login(login: string, password: string) {
  const user = await UserModel.findOne({ login });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Wrong password");
  }

  const token = jwtHelper.generate({ userId: user.id });

  return { token, user };
}
