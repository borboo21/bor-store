const Device = require('../models/Device');

//add

function addDevice(device) {
	return Device.create(device);
}

//edit

async function editDevice(id, device) {
	const newDevice = await Device.findByIdAndUpdate(id, device, {
		returnDocument: 'after',
	});
	return newDevice;
}

// delete

function deleteDevice(id) {
	return Device.deleteOne({ _id: id });
}

// get, paginate, search, category, sort

async function getDevices(
	search = '',
	category = '',
	sorting = null,
	limit = 8,
	page = 1,
) {
	const [devices, count] = await Promise.all([
		Device.find({
			name: { $regex: search, $options: 'i' },
			category: { $regex: category, $options: 'i' },
		})
			.limit(limit)
			.skip((page - 1) * limit)
			.sort(sorting ? { price: Number(sorting) } : { name: -1 }),
		Device.countDocuments({ name: { $regex: (search, category), $options: 'i' } }),
	]);
	return {
		devices,
		lastPage: Math.ceil(count / limit),
	};
}

// get all devices
async function getAllDevices() {
	const allDevices = await Device.find();
	if (!allDevices) {
		throw new Error('Devices not found');
	}
	return allDevices;
}

// get item
async function getDevice(id) {
	const oneDevice = await Device.findById(id);
	if (!oneDevice) {
		throw new Error('Device not found');
	}
	return oneDevice;
}

module.exports = {
	addDevice,
	editDevice,
	deleteDevice,
	getDevice,
	getAllDevices,
	getDevices,
};
