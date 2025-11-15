import express from "express";
import { getAllOrders, takeOrder } from "../controllers/order.ts";
import { authenticated } from "../middlewares/authenticated.ts";
import { hasRole } from "../middlewares/hasRole.ts";
import { mapOrders } from "../helpers/mapOrder.ts";
import { ROLES } from "../constants/roles.ts";
import type { OrdersResponseDTO } from "@shared/types";

const router = express.Router({ mergeParams: true });

router.get("/all", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const data = await getAllOrders();
  const mappedData: OrdersResponseDTO[] = data.map(mapOrders);
  res.send({ data: mappedData });
});

router.post("/take", authenticated, async (req, res) => {
  const order = takeOrder(req.body.userId);

  res.send({ data: order });
});

export default router;
