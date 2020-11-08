class SyncManagerClient {
    constructor(config) {
        this.config = config;
        this.players = new Map();
    }
    connectClient(localPlayerConfig) {
        this.socket = io({
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            randomizationFactor: 0.5
        });
        this.socket.on('newPlayer', onNewPlayer);
        this.socket.on('playerLeave', onPlayerLeave);
        this.socket.on('getPlayerPos', onGetPlayerPos);
        this.socket.emit('initPlayer', localPlayerConfig);
    }
}
