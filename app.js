process.title = 'siyuan';

var _ = require('underscore'),
	express = require('express'),
	User = require('./models/user'),
	Admin = require('./models/admin'),
	config = require('./config'),
	sessionStore = new express.session.MemoryStore(),
	app = express();

app.set('views', config.adminDir);
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(function (req, res, next) {
	// enable `methodKey` on GET
	if (config.methodKey in req.query) {
		_.defaults(req.body, req.query);
	}
	next();
});
app.use(express.methodOverride(config.methodKey));
app.use(express.cookieParser(config.secret));
app.use(express.session({ store: sessionStore }));

// middlewares
app.use(function (req, res, next) {
	// user session
	var userid = req.session['userid'];
	if (!userid) {
		next();
	} else {
		User.forge({ id: userid }).fetch()
			.then(function (user) {
				req.user = user;
				next();
			});
	}
});
app.use(function (req, res, next) {
	// admin session
	var adminid = req.session['adminid'];
	if (!adminid) {
		next();
	} else {
		Admin.forge({ id: adminid }).fetch()
			.then(function (admin) {
				req.admin = admin;
				next();
			});
	}
});

// regularly clean
var onlineTimeout = 5 * 60 * 1000,
	cleanCycle = onlineTimeout / 5;
setInterval(function () {
	var now = Date.now();
	_.each(sessionStore.sessions, function (str) {
		var sess = JSON.parse(str);
		if (sess.userid && now - sess.stamp > cleanCycle) {
			User.forge({ id: sess.userid })
				.set('isonline', 0).save();
		}
	});
}, cleanCycle);

app.use('/api', require('./lib/api/parser'));
app.use('/api', require('./lib/api/sender'));
// routes
require('./routes')(app);

// static
_.each(config.assets, function (o) {
	if (o.public) {
		app.use(config.toStaticURI(o.dir), express.static(o.dir));
	}
});
app.use(config.docsStaticPath, express.static(config.docsDir));
app.use(config.adminStaticPath, express.static(config.adminDir));
app.use(config.adStaticPath, express.static(config.adDir));
app.use(config.indexStaticPath, express.static(config.indexPath));

// listen on port
app.listen(config.port, function () {
	console.log([
		'', 'server started',
		'port: %d, pid: %d', ''
	].join('\n'), config.port, process.pid);
});
