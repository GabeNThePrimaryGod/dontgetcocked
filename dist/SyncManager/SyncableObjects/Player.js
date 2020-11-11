"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
const env_1 = __importDefault(require("../../env"));
const SyncableSocketObject_1 = require("./SyncableSocketObject");
class Player extends SyncableSocketObject_1.SyncableSocketObject {
    constructor(config) {
        super(config);
        // format player name to something acceptable (cc Axel)
        this.name = config.name.replace(/[^a-zA-Z0-9 ]/g, '') || "UnamedPlayer";
    }
    get data() {
        const data = super.data;
        data.name = this.name;
        return data;
    }
    static onInitPlayer(data, socket) {
        var _a;
        data.socket = socket;
        Player.instances.set(socket.id, new Player(data));
        // dans ce cas ce fonctionnement est plus adapté que socket.broadcast car nous avons besoin de savoir certaines choses qui sont calculer server side
        // TODO : A TESTER : NOUS SOMME PASSER D'UN FOREACH DE CHAQUES JOUEURS A .sockets.emit
        env_1.default.socketServer.sockets.emit('newPlayer', (_a = Player.instances.get(socket.id)) === null || _a === void 0 ? void 0 : _a.data);
    }
    static onDisconnect(socket) {
        var _a, _b;
        if (Player.instances.has(socket.id)) {
            console.log(`Deleting player ${(_a = Player.instances.get(socket.id)) === null || _a === void 0 ? void 0 : _a.name}`);
            env_1.default.socketServer.emit('playerLeave', (_b = Player.instances.get(socket.id)) === null || _b === void 0 ? void 0 : _b.data);
            Player.instances.delete(socket.id);
        }
        console.log(`User ${socket.id} disconnect`);
    }
    static syncExistingPlayers(socket) {
        // synchonise all allready existing players
        for (const player of Player.instances.values()) {
            console.log(`synchonising player ${player.name} on id "${player.socket.id}"`);
            socket.emit('newPlayer', player.data);
        }
    }
}
exports.Player = Player;
// static zone
// index : socketID, value : Player
Player.instances = new Map();
exports.default = Player;
