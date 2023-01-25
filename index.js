"use strict";
const handleMonitor = require("./monitor");
const sitesToCheck = require("./sites.json");

sitesToCheck.forEach((entity) => handleMonitor(entity));
