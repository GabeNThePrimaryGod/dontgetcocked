import socketIO from "socket.io";

import { Player } from "./SyncableObjects/Player";
import env from "../env";
import SyncableObject from "./SyncableObjects";

export class SyncManager
{
    // index : objID, value : SyncableObject
    syncObj: Map<string, SyncableObject> = new Map<string, SyncableObject>(); 

    constructor()
    {
        env.socketServer.on('connection', socket => this.onConnection(socket));
    }

    onConnection(socket: socketIO.Socket) : void
    {
        console.log(`User ${socket.id} connection`);

        socket.on('disconnect', () => Player.onDisconnect(socket));
        socket.on('initPlayer', (data : any) => Player.onInitPlayer(data, socket));

        this.syncExistingObjects(socket);
    }

    syncExistingObjects(socket: socketIO.Socket) : void
    {
        Player.syncExistingPlayers(socket);
    }
}