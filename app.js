var createError = require('http-errors');
var express = require('express');
const session = require("express-session");
require("dotenv").config();
var compression = require('compression')
var path = require('path');
var cookieParser = require('cookie-parser');
// var logger = require('morgan');
var cors = require("cors");
const httpServer = require("http").createServer(app);
const options = { cors: { origin: "*" } };
// const io = require("socket.io")(httpServer, options);


const routes = require("./controllers");
const sequelize = require("./config/connection");

var app = express();

// app.use(cors({
//   origin: ["https://ghastlygrin.herokuapp.com/"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
const PORT = process.env.PORT || 3001;

const sess = {
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    expires: 3600000
  }
};

app.use(session(sess));

// app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser('secret'));
// app.use(express.static(path.join(__dirname, '/client')));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.use(routes);
app.use(compression());
app.get('*', (req, res) => {
  res.sendFile('client/build');
});
// if (process.env.NODE_ENV === 'production') {
//   app.use(express.static(path.join(__dirname, 'client/build')));
//   app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
//   });
// }


// io.on("connection", socket => {
//   console.log(socket.id);
//   socket.on("welcome", () => {
//     console.log("hello");
//   })
// });
// httpServer.listen(3001);
app.use(function (req, res, next) {
  if (!req.session) {
    return next(new Error('Oh no')) //handle error
  }
  next() //otherwise continue
});

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => {
    console.log("running server");
  });
})

module.exports = app;
