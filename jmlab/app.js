var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var sessions = require("client-sessions");

var routes = require('./routes/index');
var jsResearch = require('./routes/research');

var constants = require('./CommonFactory/constants');

var app = express();
//app.enable('trust proxy');
/* #PublicFolder */
app.use(express.static(path.join(__dirname, 'jmlabApp', 'app')));

app.use(function(req, res, next) {
    // Website you wish to allow to connect    
    //res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:8000');
    //res.setHeader('Access-Control-Allow-Origin', 'http://127.0.0.1:3000');    
    //res.setHeader('Access-Control-Allow-Origin', '*');   
    if (req.headers.origin) {
        res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
    } else {
        res.setHeader('Access-Control-Allow-Origin', "*");
    }
    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    // Request headers you wish to allow
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type','x-forwarded-for');
    //res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,x-forwarded-for');

    //res.setHeader('Access-Control-Allow-Headers', 'x-forwarded-for');
    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    // Pass to next layer of middleware
    next();
});

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));


app.use(cookieParser());
app.use('/research', jsResearch);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.json({ code: err.status || 500, msg: err.message });
        /*
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
        */
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.json({ code: err.status || 500, msg: err.message });
    /*
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
    */
});

module.exports = app;
