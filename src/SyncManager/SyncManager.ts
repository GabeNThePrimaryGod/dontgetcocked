import socketIO from "socket.io";

import { Player } from "./Player";
import env from "../env";

export class SyncManager
{
    players: Map<string, Player> = new Map<string, Player>(); 

    constructor()
    {
        env.socketServer.on('connection', socket => this.onConnection(socket));
    }

    onConnection(socket: socketIO.Socket) : void
    {
        console.log(`User ${socket.id} connection`);

        socket.on('disconnect', () : void =>
        {
            if(this.players.has(socket.id))
            {
                console.log(`Deleting player ${this.players.get(socket.id)?.name}`);
                env.socketServer.emit('playerLeave', this.players.get(socket.id)?.data);
                this.players.delete(socket.id);
            }
    
            console.log(`User ${socket.id} disconnect`);
        });

        socket.on('initPlayer', (data : any) =>
        {
            data.socket = socket;
    
            this.players.set(socket.id, new Player(data));

            if(this.players.has(socket.id))
            {
                env.socketServer.emit('newPlayer', this.players.get(socket.id)?.data);
            }
        });

        this.syncExistingObjects(socket);
    }

    syncExistingObjects(socket: socketIO.Socket) : void
    {
        // synchonise all allready existing players
        for(const player of this.players.values())
        {
            console.log(`synchonising player ${player.name} on id "${player.socket.id}"`);

            socket.emit('newPlayer', player.data);
        }
    }
}