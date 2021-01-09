require('dotenv').config();
const express = require('express'),
api = require('./server/routes/api'),
mongoose = require('mongoose'),
path = require('path'),
app = express(),
PORT = process.env.PORT || 5000,
URI = process.env.MONGODB_URI || 'mongodb://localhost/NasaAppDB',
API_PATH = require('./src/Constants').API_PATH;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'build')));
app.use(API_PATH, api);

//render index.html for every route except /api/
app.get(new RegExp(`^(?!.*${API_PATH}/).*$`, 'i'), function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

mongoose.connect(URI, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000 } )
.then(function(){
    app.listen(PORT, function(){
        console.log(`Server is up and running on port: ${PORT}`);
    });
})
.catch(function(err){
    console.log(err.message);
});