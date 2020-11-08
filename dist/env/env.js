"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initEvironement = exports.env = exports.environmentInitialized = void 0;
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const SyncManager_1 = __importDefault(require("../SyncManager"));
exports.environmentInitialized = false;
exports.env = {};
function initEvironement() {
    if (exports.environmentInitialized) {
        throw new Error('Environement Allready Initilized');
    }
    exports.env.app = express_1.default();
    exports.env.httpServer = require('http').createServer(exports.env.app);
    exports.env.socketServer = require('socket.io')(exports.env.httpServer);
    exports.env.syncManager = new SyncManager_1.default();
    exports.env.app.use(express_1.default.static(path_1.default.join(__dirname + '/../../client')));
}
exports.initEvironement = initEvironement;
