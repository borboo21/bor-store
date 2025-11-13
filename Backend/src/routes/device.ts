import express from "express";
import {
  addDevice,
  deleteDevice,
  editDevice,
  getAllDevices,
  getDevice,
  getDevices,
} from "../controllers/device.ts";
import { mapDevice } from "../helpers/mapDevice.ts";
import { hasRole } from "../middlewares/hasRole.ts";
import { authenticated } from "../middlewares/authenticated.ts";
import { ROLES } from "../constants/roles.ts";

const router = express.Router({ mergeParams: true });

// Вывод списка девайсов, поиск, категории, сортировка, пагинация
router.get("/", async (req, res) => {
  const data = await getDevices({
    search: req.query.search as string | undefined,
    category: req.query.category as string | undefined,
    sorting: req.query.sorting ? (Number(req.query.sorting) as 1 | -1) : null,
  });
  res.send({ data });
});

// Получение всех девайсов
router.get("/all", async (req, res) => {
  try {
    const rawdata = await getAllDevices();
    const data = rawdata.map(mapDevice);
    res.send({ data });
  } catch (e) {
    if (e instanceof Error) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
});

// получение одного девайса
router.get("/:id", async (req, res) => {
  try {
    const device = await getDevice(req.params.id);
    res.send({ data: mapDevice(device) });
  } catch (e) {
    if (e instanceof Error) {
      res.send({ error: e.message || "Unknown error" });
    }
  }
});

// добавить девайс
router.post("/", authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
  const newDevice = await addDevice(req.body);
  res.send({ data: mapDevice(newDevice) });
});

// редактировать девайс
router.patch(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    const updatedDevice = await editDevice(req.params.id, req.body);
    if (updatedDevice) {
      res.send({ data: mapDevice(updatedDevice) });
    }
  }
);

// удалить девайс
router.delete(
  "/:id",
  authenticated,
  hasRole([ROLES.ADMIN]),
  async (req, res) => {
    await deleteDevice(req.params.id);

    res.send({ error: null });
  }
);

export default router;
