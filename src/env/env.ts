import http from "http";
import socket from "socket.io";
import express from "express";
import path from "path";

import SyncManager from "../SyncManager";

export let environmentInitialized = false as boolean;

export type Environment = {
    httpServer: http.Server;
    socketServer: socket.Server;
    app: express.Application;
    syncManager: SyncManager;
}

export const env = {} as Environment;

export function initEvironement()
{
    if(environmentInitialized)
    {
        throw new Error('Environement Allready Initilized');
    }

    env.app = express();
    env.httpServer = require('http').createServer(env.app);
    env.socketServer = require('socket.io')(env.httpServer);
    env.syncManager = new SyncManager();

    env.app.use(express.static(path.join(__dirname + '/../../client')));
}