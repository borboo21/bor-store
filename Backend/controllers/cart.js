const User = require('../models/User');

// add
async function addDeviceInCart(userId, device) {
	await User.findByIdAndUpdate(userId, { $push: { cart: device } });

	return device;
}
// add cart from frontend
async function addCartForUser(userId, cart) {
	const user = await User.findById(userId);
	for (const cartItem of cart) {
		const existingItem = user.cart.find(
			(userCartItem) => userCartItem.deviceId === cartItem.deviceId,
		);
		if (existingItem) {
			await User.updateOne(
				{ _id: userId, 'cart.deviceId': cartItem.deviceId },
				{ $set: { 'cart.$.quantity': cartItem.quantity } },
			);
		} else {
			user.cart.push(cartItem);
		}
	}
	await user.save();
	return cart;
}

// delete
async function deleteDeviceInCart(userId, deviceId) {
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
	addCartForUser,
	deleteDeviceInCart,
	switchQuantityInCart,
	getCart,
};
