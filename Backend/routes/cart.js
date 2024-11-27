// добавить девайс в корзину
const express = require('express');
const authenticated = require('../middlewares/authenticated');
const {
	addDeviceInCart,
	deleteDeviceInCart,
	switchQuantityInCart,
	getCart,
} = require('../controllers/cart');

const router = express.Router({ mergeParams: true });

router.post('/:userId', authenticated, async (req, res) => {
	const newDeviceInCart = await addDeviceInCart(req.params.userId, {
		deviceId: req.body.deviceId,
		category: req.body.category,
		name: req.body.name,
		price: req.body.price,
		imageUrl: req.body.imageUrl,
		quantity: 1,
	});
	res.send({ data: newDeviceInCart });
});

// удалить из корзины
router.delete('/:userId', authenticated, async (req, res) => {
	await deleteDeviceInCart(req.params.userId, req.body.id);
	res.send({ error: null });
});

// поменять количество
router.patch('/:userId', authenticated, async (req, res) => {
	await switchQuantityInCart(req.body.deviceId, req.params.userId, req.body.quantity);
	res.send({ error: null });
});

// получить данные корзины
router.get('/:userId', authenticated, async (req, res) => {
	const cart = await getCart(req.params.userId);
	res.send({ data: cart });
});

module.exports = router;
