import express from "express";
import cart from "./cart";
import device from "./device";
import order from "./order";
import auth from "./authorization";

const router = express.Router({ mergeParams: true });

router.use("/cart", cart);
router.use("/device", device);
router.use("/order", order);
router.use("/auth", auth);

export default router;
