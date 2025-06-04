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
			(userCartItem) => userCartItem.id === cartItem.id,
		);
		if (existingItem) {
			await User.updateOne(
				{ _id: userId, 'cart.id': cartItem.id },
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
async function deleteDeviceInCart(userId, id) {
	await User.findByIdAndUpdate(userId, { $pull: { cart: { id } } });
}

// switch quantity
async function switchQuantityInCart(id, userId, quantity) {
	const updateQuantity = { $set: { 'cart.$[elem].quantity': quantity } };
	const options = { arrayFilters: [{ 'elem.id': id }] };
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
