import express from "express";
import { mapUserForFrontend } from "../helpers/mapUser";
import { login, register } from "../controllers/user";

const router = express.Router({ mergeParams: true });

// Регистрация
router.post("/register", async (req, res) => {
  try {
    const { user, token } = await register(req.body.login, req.body.password);

    res.cookie("token", token, { httpOnly: true }).send({
      error: null,
      user: mapUserForFrontend(user),
    });
  } catch (e) {
    if (e instanceof Error) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
});
// Логин
router.post("/login", async (req, res) => {
  try {
    const { user, token } = await login(req.body.login, req.body.password);

    res.cookie("token", token, { httpOnly: true }).send({
      error: null,
      user: mapUserForFrontend(user),
    });
  } catch (e) {
    if (e instanceof Error) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
});
// Выход
router.post("/logout", (req, res) => {
  res.cookie("token", "", { httpOnly: true }).send({});
});

export default router;
