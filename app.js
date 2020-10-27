const express = require('express');
const path = require('path');
const logger = require('morgan');  ///color cogen colors
const cookieParser = require('cookie-parser');
const http =require('http')
const hbs = require('express-handlebars')

const appsupport=require('./appsupport')
const indexRouter = require('./routes/index');  //when exported is already handled

const app =express()
exports.app=app

// view engine setup
app.set('views', path.join( __dirname, 'views'));
app.set('view engine', 'hbs');  ///knows to use handlebars w/ hbs
app.engine('hbs', hbs(
    {
      extname:'hbs',
      defaultLayout: 'default',
      layoutsDir: __dirname + '/views/layouts/',
      partialsDir: __dirname + '/views/partials/'
    })
)
app.use(express.static('public/images'));

app.use(logger('dev'));  //deals w/ morgan
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));  ///handles static assets
//// works with current directory...located in public

//router function list
app.use('/', indexRouter);

//Error Handlers
app.use(appsupport.basicErrorHandler)                           // this is a call back because no rounded brackets for basicErrorHandler
app.use(appsupport.handle404)

const port = appsupport.normalizePort(process.env.PORT || '3000');
exports.port=port
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);
exports.server=server
/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port);
server.on('error', appsupport.onError);
server.on('listening', appsupport.onListening);