import socketIO from "socket.io";

import env from "../../env";
import { SyncableSocketObject, SyncableSocketObjectData } from "./SyncableSocketObject";
    
export type PlayerData = SyncableSocketObjectData & {
    name: string
}

export class Player extends SyncableSocketObject {

    name: string;

    constructor(config : any)
    {
        super(config);

        // format player name to something acceptable (cc Axel)
        this.name = config.name.replace(/[^a-zA-Z0-9 ]/g, '') || "UnamedPlayer";
    }

    get data() : PlayerData
    {
        const data = super.data as PlayerData;
        data.name = this.name;
        return data;
    }

    // static zone

    // index : socketID, value : Player
    public static instances = new Map<string, Player>();

    public static onInitPlayer(data : any, socket : socketIO.Socket) : void
    {
        data.socket = socket;
    
        Player.instances.set(socket.id, new Player(data));

        // dans ce cas ce fonctionnement est plus adapté que socket.broadcast car nous avons besoin de savoir certaines choses qui sont calculer server side
        
        // TODO : A TESTER : NOUS SOMME PASSER D'UN FOREACH DE CHAQUES JOUEURS A .sockets.emit
        
        env.socketServer.sockets.emit('newPlayer', Player.instances.get(socket.id)?.data);
    }

    public static onDisconnect(socket : socketIO.Socket) : void
    {
        if(Player.instances.has(socket.id))
        {
            console.log(`Deleting player ${Player.instances.get(socket.id)?.name}`);
            env.socketServer.emit('playerLeave', Player.instances.get(socket.id)?.data);
            Player.instances.delete(socket.id);
        }

        console.log(`User ${socket.id} disconnect`);
    }

    public static syncExistingPlayers(socket: socketIO.Socket) : void
    {
        // synchonise all allready existing players
        for(const player of Player.instances.values())
        {
            console.log(`synchonising player ${player.name} on id "${player.socket.id}"`);

            socket.emit('newPlayer', player.data);
        }
    }


}

export default Player;