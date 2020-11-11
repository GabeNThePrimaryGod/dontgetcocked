"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env_1 = require("./env");
const port = 8080;
env_1.initEvironement();
env_1.env.httpServer.listen(port);
console.log(`Server Listening on port ${port}`);
