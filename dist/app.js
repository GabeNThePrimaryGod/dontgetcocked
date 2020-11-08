"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
env_1.initEvironement();
env_1.env.httpServer.listen(8080);
console.log(`Server Listening on port ${8080}`);
