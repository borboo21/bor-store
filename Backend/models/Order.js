const mongoose = require('mongoose');

const OrderItemSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	quantity: {
		type: Number,
		required: true,
	},
});

const OrderSchema = mongoose.Schema(
	{
		userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
		login: { type: String, required: true },
		items: [OrderItemSchema],
	},
	{ timestamps: true },
);

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;
