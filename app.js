var express 		= require('express'), 
	cfg 			= require('./config.json'),
	load 			= require('express-load'), 
	methodOverride 	= require('method-override'),
	path      		= require('path'),
	cookieParser 	= require('cookie-parser'),
	cookie 			= cookieParser(cfg.SECRET),
	expressSession 	= require('express-session'),
	bodyParser 		= require('body-parser'),
	RedisStore 		= require('connect-redis')(expressSession),
	store 			= new RedisStore({prefix: cfg.KEY}),
	app 			= express();

	// view engine setup
	app.set('views', path.join(__dirname, 'views')); //caminhos das views
	app.set('view engine', 'ejs'); // setando a engine de render
	
	app.use(cookie); //cookie
	// app.use(expressSession({secret: 'ssshhhhh'}));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: true}));
	app.use(methodOverride('_method'));	
	app.use(express.static(__dirname + '/public', cfg.CACHE));// destino de coisas staticas

	load('models')
		.then('controllers')
		.then('routes')
		.into(app);

	// catch 404 and forward to error handler
	app.use(function(req, res, next) {
		var err = new Error('Not Found');
		err.status = 404;
		next(err);
	});


  	if (app.get('env') === 'development') {
      	app.use(function(err, req, res, next) {
      	
      		res.status(err.status || 500);
      		res.render('error', {
        		message: err.message,
        		error: err
      		});

    	});
  	}

  	// production error handler
  	// no stacktraces leaked to user
  	app.use(function(err, req, res, next) {
    	// console.log( req.session)
    	res.status(err.status || 500);
      	res.render('error', {
        	
        	message: err.message,
        	error: {}
    	});
  });

module.exports = app;