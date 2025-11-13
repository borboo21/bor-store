import express from "express";
import { authenticated } from "../middlewares/authenticated.ts";
import {
  addCartForUser,
  addDeviceInCart,
  deleteDeviceInCart,
  getCart,
  switchQuantityInCart,
} from "../controllers/cart.ts";

const router = express.Router({ mergeParams: true });

// добавить корзину собранную на фронтенде
router.post("/merge/:userId", authenticated, async (req, res) => {
  const cart = await addCartForUser(req.params.userId, req.body);
  res.send({ data: cart });
});

// добавить девайс в корзину
router.post("/:userId", authenticated, async (req, res) => {
  const newDeviceInCart = await addDeviceInCart(
    req.params.userId,
    req.body.deviceId,
    req.body.variantId,
    req.body.specId
  );
  res.send({ data: newDeviceInCart });
});

// удалить из корзины
router.delete("/:userId", authenticated, async (req, res) => {
  await deleteDeviceInCart(req.params.userId, req.body.specId);
  res.send({ error: null });
});

// поменять количество
router.patch("/:userId", authenticated, async (req, res) => {
  await switchQuantityInCart(
    req.body.specId,
    req.params.userId,
    req.body.quantity
  );
  res.send({ error: null });
});

// получить данные корзины
router.get("/:userId", authenticated, async (req, res) => {
  const cart = await getCart(req.params.userId);
  res.send({ data: cart });
});

export default router;
