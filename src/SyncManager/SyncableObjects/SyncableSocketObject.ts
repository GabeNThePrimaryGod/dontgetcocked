import socketIO from "socket.io";
import { SyncableObject, SyncableObjectData } from "./SyncableObject";

export type SyncableSocketObjectData = SyncableObjectData & {
    socketID: string
}

/**
 * 
 * 
 * 
 */
export class SyncableSocketObject extends SyncableObject {
    
    socket : socketIO.Socket;

    constructor(config : any) 
    {
        super(config);

        this.socket = config.socket;
        console.log(`init new SocketObject for class ${this.constructor.name} as id "${this.socket.id}"`);

        // this.constructor.name permet d'écouter et d'émettre sur plusieurs evenements differents en fonction du nom de la class mère
        this.socket.on(`sync${this.constructor.name}Pos`, (data: any) => { this.syncPos(data); });
    }

    syncPos(posData: any) : void
    {
        console.log('sync socketObject pos', posData.pos);

        this.pos = posData.pos;
        this.socket.broadcast.emit(`get${this.constructor.name}Pos`, this.data);
    }

    get data() : SyncableSocketObjectData
    {
        const data = super.data as SyncableSocketObjectData;
        data.socketID = this.socket.id;
        return data;
    }
}