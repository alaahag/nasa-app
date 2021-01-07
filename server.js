require('dotenv').config();
const express = require('express'),
api = require('./server/routes/api.js'),
mongoose = require('mongoose'),
path = require('path'),
app = express(),
PORT = process.env.PORT || 5000,
URI = process.env.MONGODB_URI || 'mongodb://localhost/NasaAppDB';

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'node_modules')));

app.use(express.static(path.join(__dirname, 'build')));
app.get('/^(?!.*/api/).*$/', function (req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.use('/api', api);

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000})
.then(function(){
    app.listen(PORT, function(){
        console.log(`Server is up and running on port: ${PORT}`);
    });
})
.catch(function(err){
    console.log(err.message);
});