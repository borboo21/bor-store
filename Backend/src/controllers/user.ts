import bcrypt from "bcrypt";
import { jwtHelper } from "../helpers/token.ts";
import { UserModel } from "../models/User.ts";

//register
export async function register(login: string, password: string) {
  if (!password) {
    throw new Error("Пароль пуст");
  }
  const passwordHash = await bcrypt.hash(password, 10);

  const user = await UserModel.create({
    login,
    password: passwordHash,
    cart: { amount: 0, items: [] },
  });
  const token = jwtHelper.generate({ userId: user.id });

  return { user, token };
}

//login
export async function login(login: string, password: string) {
  const user = await UserModel.findOne({ login });

  if (!user) {
    throw new Error("Пользователь не найден");
  }

  const isPasswordMatch = await bcrypt.compare(password, user.password);

  if (!isPasswordMatch) {
    throw new Error("Пароль неверный");
  }

  const token = jwtHelper.generate({ userId: user.id });

  return { token, user };
}
