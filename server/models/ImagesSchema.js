const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const imagesSchema = new Schema({
    title: String,
    url: String,
    explanation: String
});

const ImageSchema = mongoose.model('ImageSchema', imagesSchema, 'ImagesSchema');

module.exports = ImageSchema;