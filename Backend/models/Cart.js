const mongoose = require('mongoose');
const validator = require('validator');

const CartSchema = mongoose.Schema({
	deviceId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	imageUrl: {
		type: String,
		required: true,
		validate: {
			validator: validator.isURL,
			message: 'Image should be a valid URL',
		},
	},
	name: {
		type: String,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
		default: 1,
	},
	price: {
		type: Number,
		required: true,
	},
});

const CartItem = mongoose.model('CartItem', CartSchema);

module.exports = CartItem;
