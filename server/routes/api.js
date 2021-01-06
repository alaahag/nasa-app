
const express = require('express'),
axios = require('axios'),
router = express.Router(),
ImagesSchema = require('../models/ImagesSchema.js');


if (process.env.NODE_ENV !== "production") {
	router.use(function(req, res, next) {
		res.header('Access-Control-Allow-Origin', '*');
		res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
		res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
		next();
	});
}

router.post('/image', async function(req, res) {
	try {
		const imageSchema = new ImagesSchema({ ...req.body });
		await imageSchema.save();
		res.send(imageSchema);
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/images', async function(req, res) {
	try {
		const imageSchema = await ImagesSchema.find({});
		res.send(imageSchema);
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/image/:id', async function(req, res) {
	try {
		const imageSchema = await ImagesSchema.findOne({ _id: req.params.id });
		res.send(imageSchema);
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.delete('/image/:id', async function(req, res) {
	try {
		const imageSchema = await ImagesSchema.findByIdAndRemove({ _id: req.params.id });
		res.send(imageSchema);
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});

router.get('/APOD', async function(req, res) {
	try {
		const dData = await axios.get(process.env.APOD_API);
		res.send(dData.data);
	}
	catch (error) {
		console.log(error);
		res.send(error);
	}
});



module.exports = router;