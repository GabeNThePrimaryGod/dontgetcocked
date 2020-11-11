"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncManager = void 0;
const Player_1 = require("./SyncableObjects/Player");
const env_1 = __importDefault(require("../env"));
class SyncManager {
    constructor() {
        // index : objID, value : SyncableObject
        this.syncObj = new Map();
        env_1.default.socketServer.on('connection', socket => this.onConnection(socket));
    }
    onConnection(socket) {
        console.log(`User ${socket.id} connection`);
        socket.on('disconnect', () => Player_1.Player.onDisconnect(socket));
        socket.on('initPlayer', (data) => Player_1.Player.onInitPlayer(data, socket));
        this.syncExistingObjects(socket);
    }
    syncExistingObjects(socket) {
        Player_1.Player.syncExistingPlayers(socket);
    }
}
exports.SyncManager = SyncManager;
