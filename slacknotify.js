const SlackNotify = require("slack-notify");

const MY_SLACK_WEBHOOK_URL = "";

const slack = SlackNotify(MY_SLACK_WEBHOOK_URL);

const ICON_URL = "";

const SLACK_CHANNEL = "#uptime";

const slackNotify = (url, status, msg) => {
	slack.alert({
		channel: SLACK_CHANNEL,
		icon_url: ICON_URL,
		text: `${url} Downtime Incidence`,
		attachments: [
			{
				color: "#FF0000",
				blocks: [
					{
						type: "header",
						text: {
							type: "plain_text",
							text: "Downtime Incidence ",
							emoji: true,
						},
					},
					{
						type: "divider",
					},
					{
						type: "context",
						elements: [
							{
								type: "mrkdwn",
								text: `*URL: * ${url}`,
							},
							{
								type: "mrkdwn",
								text: `*Status Code: * ${status}`,
							},
						],
					},
					{
						type: "section",
						text: {
							type: "mrkdwn",
							text: `*Message: * ${msg}`,
						},
					},
				],
			},
		],
	});
};

module.exports = slackNotify;
