type SyncManagerClientConfig = {
    sendDelay: number,
    leeway: number
}

class SyncManagerClient 
{
    socket: SocketIOClient.Socket | undefined
    players: Map<string, Player>
    config: SyncManagerClientConfig

    constructor(config : SyncManagerClientConfig,)
    {
        this.config = config;
        this.players = new Map<string, Player>();
    }

    public connectClient(localPlayerConfig : any) : void
    {
        this.socket = io({
            reconnection: true,             // whether to reconnect automatically
            reconnectionAttempts: Infinity, // number of reconnection attempts before giving up
            reconnectionDelay: 1000,        // how long to initially wait before attempting a new reconnection
            reconnectionDelayMax: 5000,     // maximum amount of time to wait between reconnection attempts. Each attempt increases the reconnection delay by 2x along with a randomization factor
            randomizationFactor: 0.5
        });
    
        this.socket.on('newPlayer', onNewPlayer);
        this.socket.on('playerLeave', onPlayerLeave);
        this.socket.on('getPlayerPos', onGetPlayerPos);

        this.socket.emit('initPlayer', localPlayerConfig);
    }
}