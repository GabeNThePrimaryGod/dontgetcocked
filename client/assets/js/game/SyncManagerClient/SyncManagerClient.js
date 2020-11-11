class SyncManagerClient {
    static connect(localPlayerConfig) {
        this.socket = io({
            reconnection: true,
            reconnectionAttempts: Infinity,
            reconnectionDelay: 1000,
            reconnectionDelayMax: 5000,
            randomizationFactor: 0.5
        });
        this.socket.on('newPlayer', Player.onNewPlayer);
        this.socket.on('playerLeave', Player.onPlayerLeave);
        this.socket.on('getPlayerPos', Player.onGetPlayerPos);
        this.socket.emit('initPlayer', localPlayerConfig);
    }
    static syncUpdate() {
        if (Player.instances.has(SyncManagerClient.socket.id)) {
            const playerData = Player.instances.get(SyncManagerClient.socket.id).data;
            //console.log(playerData);
            SyncManagerClient.socket.emit('syncPlayerPos', playerData);
        }
    }
}
SyncManagerClient.config = {
    sendDelay: 10,
    leeway: 0.1
};
// key : ObjType ?
SyncManagerClient.syncableObjs = [];
