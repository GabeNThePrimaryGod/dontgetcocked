"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncableObject = void 0;
/**
 *
 *
 *
 */
class SyncableObject {
    constructor(config) {
        this.pos = config.pos || { x: 0, y: 0 };
    }
    get data() {
        return {
            pos: this.pos
        };
    }
}
exports.SyncableObject = SyncableObject;
