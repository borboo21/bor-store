import express from "express";
import { authenticated } from "../middlewares/authenticated";
import {
  addDeviceInCart,
  deleteDeviceInCart,
  switchQuantityInCart,
  getCart,
  addCartForUser,
} from "../controllers/cart";

const router = express.Router({ mergeParams: true });

// добавить девайс в корзину
router.post("/:userId", authenticated, async (req, res) => {
  const newDeviceInCart = await addDeviceInCart(req.params.userId, req.body.id);
  res.send({ data: newDeviceInCart });
});

// удалить из корзины
router.delete("/:userId", authenticated, async (req, res) => {
  await deleteDeviceInCart(req.params.userId, req.body.id);
  res.send({ error: null });
});

// поменять количество
router.patch("/:userId", authenticated, async (req, res) => {
  await switchQuantityInCart(req.body.id, req.params.userId, req.body.quantity);
  res.send({ error: null });
});

// получить данные корзины
router.get("/:userId", authenticated, async (req, res) => {
  const cart = await getCart(req.params.userId);
  res.send({ data: cart });
});

// добавить корзину собранную на фронтенде
router.post("/merge/:userId", authenticated, async (req, res) => {
  const cart = await addCartForUser(req.params.userId, req.body);
  res.send({ data: cart });
});

export default router;
