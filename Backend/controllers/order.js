const Order = require('../models/Order');
const User = require('../models/User');

function getAllOrders() {
	return Order.find().sort({ createdAt: -1 });
}

async function takeOrder(userId) {
	const user = await User.findById(userId);
	const order = new Order({
		userId: user._id,
		login: user.login,
		items: user.cart.map((item) => ({
			name: item.name,
			price: item.price,
			quantity: item.quantity,
		})),
	});
	await order.save();
	user.cart = [];
	await user.save();
}

module.exports = {
	getAllOrders,
	takeOrder,
};
