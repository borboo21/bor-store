import express from "express";
import cart from "./cart.ts";
import device from "./device.ts";
import order from "./order.ts";
import auth from "./authorization.ts";

const router = express.Router({ mergeParams: true });

router.use("/cart", cart);
router.use("/device", device);
router.use("/order", order);
router.use("/auth", auth);

export default router;
