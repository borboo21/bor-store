const CartItem = require('../models/Cart');
const User = require('../models/user');

// add
async function addDeviceInCart(userId, device) {
	const newItemInCart = await CartItem.create(device);

	await User.findByIdAndUpdate(userId, { $push: { cart: device } });

	return newItemInCart;
}
// delete

async function deleteDeviceInCart(userId, deviceId) {
	await CartItem.deleteOne({ deviceId: deviceId });
	await User.findByIdAndUpdate(userId, { $pull: { cart: { deviceId } } });
}

// switch quantity
async function switchQuantityInCart(deviceId, userId, quantity) {
	const updateQuantity = { $set: { 'cart.$[elem].quantity': quantity } };
	const options = { arrayFilters: [{ 'elem.deviceId': deviceId }] };
	const user = await User.findOneAndUpdate({ _id: userId }, updateQuantity, options, {
		new: true,
	});
	return user;
}

// get
async function getCart(userId) {
	const user = await User.findById(userId);
	return user.cart;
}

module.exports = {
	addDeviceInCart,
	deleteDeviceInCart,
	switchQuantityInCart,
	getCart,
};
