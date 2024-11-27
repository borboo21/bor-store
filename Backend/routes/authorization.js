const express = require('express');
const mapUser = require('../helpers/mapUser');
const { login, register } = require('../controllers/user');

const router = express.Router({ mergeParams: true });

// Регистрация
router.post('/register', async (req, res) => {
	try {
		const { user, token } = await register(req.body.login, req.body.password);

		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		});
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});
// Логин
router.post('/login', async (req, res) => {
	try {
		const { user, token } = await login(req.body.login, req.body.password);

		res.cookie('token', token, { httpOnly: true }).send({
			error: null,
			user: mapUser(user),
		});
	} catch (e) {
		res.send({ error: e.message || 'Unknown error' });
	}
});
// Выход
router.post('/logout', (req, res) => {
	res.cookie('token', '', { httpOnly: true }).send();
});

module.exports = router;
