var PORT = 8000 || process.env.PORT;
var apiRouter = require('./router/api');
var indexRouter = require('./router/page');

var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');
var socketEvents = require('./model/socket');

var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var path = require('path');




app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/api', apiRouter);
app.use('/', indexRouter);


app.set('views', __dirname + './dist');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(path.join(__dirname, './dist')));

socketEvents.socketEvent(io);


http.listen(PORT,'0.0.0.0', function () {
    console.log("Berjalan "+PORT)
});
