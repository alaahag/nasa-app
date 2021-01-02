const express = require('express'),
api = require('./server/routes/api.js'),
mongoose = require('mongoose'),
path = require('path'),
app = express(),
PORT = process.env.PORT || 3001,
URI = process.env.MONGODB_URI || 'mongodb://localhost/NasaAppDB';
//NOTE: modify utils.js for PRODUCTION [default local server path: http://localhost:3001]

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(express.static(path.join(__dirname, 'node_modules')));
app.use(express.static(path.join(__dirname, 'build')));

// app.use(express.static(path.join(__dirname, 'dist')));
// app.get('/', function (req, res) {
//     res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });

app.use('/', api);

mongoose.connect(URI, {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true, connectTimeoutMS: 5000, serverSelectionTimeoutMS: 5000})
.then(function(){
    app.listen(PORT, function(){
        console.log(`Server is up and running on port: ${PORT}`);
    });
})
.catch(function(err){
    console.log(err.message);
});