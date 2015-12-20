var http = require("http"),
	config = require("./config"),
	express = require("express"),
	path = require("path"),
	app = express();

exports.start = function() {
	
	app.use(express.static(path.join(__dirname, "../", "")));

	http.createServer(app).listen(config.port, config.host, function() {
		console.log("Server (" + config.name + ") is listening on " + config.host + ":"
			+ config.port);
	});
}