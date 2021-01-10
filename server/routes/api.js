const express = require('express'),
axios = require('axios'),
router = express.Router(),
ImagesSchema = require('../models/ImagesSchema.js'),
{ body, param, validationResult } = require('express-validator');

router.post('/image',
	body('title').not().isEmpty().trim().escape(),
	body('url').not().isEmpty().trim(),
	body('explanation').escape(),
	async function(req, res) {
		try {
			if (validationResult(req).isEmpty()) {
				const imageSchema = new ImagesSchema({ ...req.body });
				await imageSchema.save();
				res.send(imageSchema);
			}
			else
				throw new Error('Invalid data.');
		}
		catch (error) {
			res.status(400).send({ error: error.message });
		}
	}
);

router.get('/images', async function(req, res) {
	try {
		const imageSchema = await ImagesSchema.find({});
		res.send(imageSchema);
	}
	catch (error) {
		res.status(400).send({ error: error.message });
	}
});

router.get('/image/:id',
	param('id').not().isEmpty().isAlphanumeric(),
	async function(req, res) {
		try {
			if (validationResult(req).isEmpty()) {
				const imageSchema = await ImagesSchema.findOne({ _id: req.params.id });
				res.send(imageSchema);
			}
			else
				throw new Error('Invalid ID.');
		}
		catch (error) {
			res.status(400).send({ error: error.message });
		}
	}
);

router.delete('/image/:id',
	param('id').not().isEmpty().isAlphanumeric(),
	async function(req, res) {
		try {
			if (validationResult(req).isEmpty()) {
				const imageSchema = await ImagesSchema.findByIdAndRemove({ _id: req.params.id });
				res.send(imageSchema);
			}
			else
				throw new Error('Invalid ID.');
		}
		catch (error) {
			res.status(400).send({ error: error.message });
		}
	}
);

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