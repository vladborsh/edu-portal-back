var express  = require('express'),
  app        = express(),
  path       = require('path'),
  bodyParser = require('body-parser'),
  mongoose   = require('mongoose'),
  morgan     = require('morgan'),
  port       = process.env.PORT || 3000,
  router     = express.Router(),
  favicon    = require('serve-favicon')

var env = process.env.NODE_ENV || 'dev';
var config = require(`./config/${env}.config`);

mongoose.connect(config.database, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('\nsuccessfully connected to db'); /**/
	}
});

app.use(morgan('dev'));

app.use( (req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4001');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,X-Access-Token');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.disable('etag');
require('./routes/index')(app);


app.listen(port, function () {
	console.log('\nserver started on port ' + port);
})