"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncManager = exports.Player = void 0;
const Player_1 = __importDefault(require("./Player"));
exports.Player = Player_1.default;
const SyncManager_1 = require("./SyncManager");
Object.defineProperty(exports, "SyncManager", { enumerable: true, get: function () { return SyncManager_1.SyncManager; } });
exports.default = SyncManager_1.SyncManager;
