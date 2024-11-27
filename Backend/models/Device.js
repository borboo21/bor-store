const mongoose = require('mongoose');
const validator = require('validator');

const DeviceSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
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
});

const Device = mongoose.model('Device', DeviceSchema);

module.exports = Device;
