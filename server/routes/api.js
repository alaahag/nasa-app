const express = require('express'),
axios = require('axios'),
router = express.Router(),
ImagesSchema = require('../models/ImagesSchema.js');

router.post('/image', async function(req, res) {
	try {
		const imageSchema = new ImagesSchema({ ...req.body });
		await imageSchema.save();
		res.send(imageSchema);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/images', async function(req, res) {
	try {
		const imageSchema = await ImagesSchema.find({});
		res.send(imageSchema);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/image/:id', async function(req, res) {
	try {
		const imageSchema = await ImagesSchema.findOne({ _id: req.params.id });
		res.send(imageSchema);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.delete('/image/:id', async function(req, res) {
	try {
		const imageSchema = await ImagesSchema.findByIdAndRemove({ _id: req.params.id });
		res.send(imageSchema);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/APOD', async function(req, res) {
	try {
		const dData = await axios.get(process.env.APOD_API);
		res.send(dData.data);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

module.exports = router;