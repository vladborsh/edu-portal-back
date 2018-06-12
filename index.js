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
var config = require('./config/' + env + '.config')

mongoose.connect(config.database, function (err) {
	if (err) {
		console.log(err);
	} else {
		console.log('\nsuccessfully connected to db'); /**/
	}
});

app.use(morgan('dev'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
require('./routes/index')(app);

app.listen(port, function () {
	console.log('\nserver started on port ' + port);
})