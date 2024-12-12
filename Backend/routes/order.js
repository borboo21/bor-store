const express = require('express');
const authenticated = require('../middlewares/authenticated');
const { getAllOrders, takeOrder } = require('../controllers/order');
const hasRole = require('../middlewares/hasRole');
const ROLES = require('../constants/roles');

const router = express.Router({ mergeParams: true });

router.get('/all', authenticated, hasRole([ROLES.ADMIN]), async (req, res) => {
	const data = await getAllOrders();
	res.send({ data });
});

router.post('/take', authenticated, async (req, res) => {
	const order = takeOrder(req.body.userId);

	res.send({ data: order });
});

module.exports = router;
