module.exports = function (device) {
	return {
		id: device._id,
		category: device.category,
		name: device.name,
		price: device.price,
		imageUrl: device.imageUrl,
		quantity: device.quantity,
	};
};
