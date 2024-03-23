const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const registerRoute = require("./routes/index.js");
const path = require('path');
const ejs = require('ejs');

const app = express();
const PORT = 4000;

const initialize = (app) => {
  // Middlewares
  app.use(cors({ origin: '*' })); // If request isn't coming from same domain, server will reject the requests
  app.use(express.json()); // Converts JSON is req body to javascript object
  app.use(express.urlencoded({ extended: true })); // If encoded URL is received, it will decode
  app.use(express.static(path.join(__dirname, 'public')));
  app.set('view engine', 'ejs');

  app.get('/register', (req, res) => {
    res.render('register'); // Render register.ejs
});

app.get('/login', (req, res) => {
    res.render('login'); // Render login.ejs
});

  mongoose.connect("mongodb+srv://sheshadribhata:supplyframe@weathercluster.3vxzewv.mongodb.net/?retryWrites=true&w=majority&appName=weatherCluster"); //MongoDB connection

  registerRoute(app); //Initialize routes
};

initialize(app);

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));

module.exports = app;
