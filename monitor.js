const Monitor = require("ping-monitor");
const slackNotify = require("./slacknotify");

const INTERVAL = 60;

const handleMonitor = (entity) => {
	try {
		const myMonitor = new Monitor({
			website: entity.url,
			title: entity.name || entity.url,
			interval: INTERVAL,
		});

		myMonitor.on("up", function (res, state) {
			console.log(`Yay, ${res.website}  is up`);
		});

		myMonitor.on("down", function (res) {
			console.log(`Oh no :( , ${res.website}  is down`);

			slackNotify(res.website, res.statusCode, res.responseMessage);
		});

		myMonitor.on("stop", function (website) {
			console.log(`Oh no no no :((, ${website} monitoring is stopped`);
			slackNotify(
				website,
				500,
				`Uptime has stopped the monitoring of ${website}`
			);
		});

		myMonitor.on("timeout", function (error, res) {
			console.log("Timedout");
			slackNotify(res.website, res.statusCode, error.code);
		});

		myMonitor.on("error", function (error, res) {
			console.log("errored");
			slackNotify(res.website, res.statusCode, error.code);
		});
	} catch (err) {
		slackNotify("Uptime Error", 500, "Uptime Application ERROR!");
	}
};

module.exports = handleMonitor;
