type SyncManagerClientConfig = {
    sendDelay: number,
    leeway: number
}

class SyncManagerClient 
{
    static config = {
        sendDelay: 10,
        leeway: 0.1
    } as SyncManagerClientConfig

    static socket: SocketIOClient.Socket | undefined

    // key : ObjType ?
    static syncableObjs = [] as SyncableObject[]

    public static connect(localPlayerConfig : any) : void
    {
        this.socket = io({
            reconnection: true,             // whether to reconnect automatically
            reconnectionAttempts: Infinity, // number of reconnection attempts before giving up
            reconnectionDelay: 1000,        // how long to initially wait before attempting a new reconnection
            reconnectionDelayMax: 5000,     // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
            randomizationFactor: 0.5
        });
    
        this.socket.on('newPlayer', Player.onNewPlayer);
        this.socket.on('playerLeave', Player.onPlayerLeave);
        this.socket.on('getPlayerPos', Player.onGetPlayerPos);

        this.socket.emit('initPlayer', localPlayerConfig);
    }

    public static syncUpdate()
    {
        if(Player.instances.has(SyncManagerClient.socket.id))
        {   
            const playerData = Player.instances.get(SyncManagerClient.socket.id).data;

            //console.log(playerData);

            SyncManagerClient.socket.emit('syncPlayerPos', playerData);
        }
    }
}