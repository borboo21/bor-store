import express from "express";
import { getAllOrders, takeOrder } from "../controllers/order";
import ROLES from "../constants/roles";
import { authenticated } from "../middlewares/authenticated";
import { hasRole } from "../middlewares/hasRole";
import { mapOrders } from "../helpers/mapOrder";
import { OrdersResponseDTO } from "@shared/index";

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
