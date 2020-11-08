import socketIO from "socket.io";
import env from "../env";
    
export type PlayerPosition = { 
    x: any;
    y: any;
};

export type PlayerData = {
    socketID: string,
    pos: PlayerPosition,
    name: string
}

export class Player {

    socket : socketIO.Socket;
    pos : PlayerPosition;
    name: string;

    constructor(config : any)
    {
        this.socket = config.socket;
        this.pos = config.pos || {x: 0, y:0};
        this.name = config.name || "UnamedPlayer";

        console.log(`init new SocketObject as id "${this.socket.id}"`);

        this.socket.on(`syncPlayerPos`, (data: any) => { this.syncPlayerPos(data); });
    }

    syncPlayerPos(posData: any) : void
    {
        console.log('sync socketObject pos', posData.pos);

        this.pos = posData.pos;
        this.socket.broadcast.emit(`getPlayerPos`, this.data);
    }

    get data() : PlayerData
    {
        return {
            socketID: this.socket.id,
            pos: this.pos,
            name: this.name
        };
    }
}

export default Player;