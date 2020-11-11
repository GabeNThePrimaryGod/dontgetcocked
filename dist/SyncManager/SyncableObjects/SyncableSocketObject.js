"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncableSocketObject = void 0;
const SyncableObject_1 = require("./SyncableObject");
/**
 *
 *
 *
 */
class SyncableSocketObject extends SyncableObject_1.SyncableObject {
    constructor(config) {
        super(config);
        this.socket = config.socket;
        console.log(`init new SocketObject for class ${this.constructor.name} as id "${this.socket.id}"`);
        // this.constructor.name permet d'écouter et d'émettre sur plusieurs evenements differents en fonction du nom de la class mère
        this.socket.on(`sync${this.constructor.name}Pos`, (data) => { this.syncPos(data); });
    }
    syncPos(posData) {
        console.log('sync socketObject pos', posData.pos);
        this.pos = posData.pos;
        this.socket.broadcast.emit(`get${this.constructor.name}Pos`, this.data);
    }
    get data() {
        const data = super.data;
        data.socketID = this.socket.id;
        return data;
    }
}
exports.SyncableSocketObject = SyncableSocketObject;
