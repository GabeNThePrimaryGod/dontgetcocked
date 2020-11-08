"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
class Player {
    constructor(config) {
        this.socket = config.socket;
        this.pos = config.pos || { x: 0, y: 0 };
        this.name = config.name || "UnamedPlayer";
        console.log(`init new SocketObject as id "${this.socket.id}"`);
        this.socket.on(`syncPlayerPos`, (data) => { this.syncPlayerPos(data); });
    }
    syncPlayerPos(posData) {
        console.log('sync socketObject pos', posData.pos);
        this.pos = posData.pos;
        this.socket.broadcast.emit(`getPlayerPos`, this.data);
    }
    get data() {
        return {
            socketID: this.socket.id,
            pos: this.pos,
            name: this.name
        };
    }
}
exports.Player = Player;
exports.default = Player;
