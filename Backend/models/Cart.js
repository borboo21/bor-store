const mongoose = require('mongoose');
const validator = require('validator');

const CartSchema = mongoose.Schema({
	deviceId: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'Device',
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
	price: {
		type: Number,
		required: true,
	},
});

const Cart = mongoose.model('User', CartSchema);

module.exports = Cart;
