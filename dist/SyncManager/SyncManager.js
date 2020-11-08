"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncManager = void 0;
const Player_1 = require("./Player");
const env_1 = __importDefault(require("../env"));
class SyncManager {
    constructor() {
        this.players = new Map();
        env_1.default.socketServer.on('connection', socket => this.onConnection(socket));
    }
    onConnection(socket) {
        console.log(`User ${socket.id} connection`);
        socket.on('disconnect', () => {
            var _a, _b;
            if (this.players.has(socket.id)) {
                console.log(`Deleting player ${(_a = this.players.get(socket.id)) === null || _a === void 0 ? void 0 : _a.name}`);
                env_1.default.socketServer.emit('playerLeave', (_b = this.players.get(socket.id)) === null || _b === void 0 ? void 0 : _b.data);
                this.players.delete(socket.id);
            }
            console.log(`User ${socket.id} disconnect`);
        });
        socket.on('initPlayer', (data) => {
            var _a;
            data.socket = socket;
            this.players.set(socket.id, new Player_1.Player(data));
            if (this.players.has(socket.id)) {
                env_1.default.socketServer.emit('newPlayer', (_a = this.players.get(socket.id)) === null || _a === void 0 ? void 0 : _a.data);
            }
        });
        this.syncExistingObjects(socket);
    }
    syncExistingObjects(socket) {
        // synchonise all allready existing players
        for (const player of this.players.values()) {
            console.log(`synchonising player ${player.name} on id "${player.socket.id}"`);
            socket.emit('newPlayer', player.data);
        }
    }
}
exports.SyncManager = SyncManager;
