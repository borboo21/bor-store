const Order = require('../models/Order');
const User = require('../models/user');

function getAllOrders() {
	return Order.find();
}

async function takeOrder(userId) {
	const user = await User.findById(userId);
	console.log(user);
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
