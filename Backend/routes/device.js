// Вывод списка девайсов, поиск, категории, сортировка, пагинация
const express = require('express');
const authenticated = require('../middlewares/authenticated');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');
const {
	getDevices,
	getDevice,
	addDevice,
	editDevice,
	deleteDevice,
} = require('../controllers/device');
const mapDevice = require('../helpers/mapDevice');

const router = express.Router({ mergeParams: true });

router.get('/', async (req, res) => {
	const data = await getDevices(
		req.query.search,
		req.query.category,
		req.query.sorting,
		req.query.limit,
		req.query.page,
	);

	res.send({ data });
});

// получение одного девайса
router.get('/:id', async (req, res) => {
	const device = await getDevice(req.params.id);

	res.send({ data: mapDevice(device) });
});

// добавить девайс
router.post('/', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const newDevice = await addDevice({
		category: req.body.category,
		name: req.body.name,
		price: req.body.price,
		imageUrl: req.body.imageUrl,
	});

	res.send({ data: mapDevice(newDevice) });
});

// редактировать девайс
router.patch('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const updatedDevice = await editDevice(req.params.id, {
		category: req.body.category,
		name: req.body.name,
		price: req.body.price,
		imageUrl: req.body.imageUrl,
	});

	res.send({ data: mapDevice(updatedDevice) });
});

// удалить девайс
router.delete('/:id', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	await deleteDevice(req.params.id);

	res.send({ error: null });
});

module.exports = router;
