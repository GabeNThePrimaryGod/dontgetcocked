function onNewPlayer(playerData : PlayerData)
{
    // si le socket id du nouveau joueur est le notre ça veut dire que c'est le joueur local qui viens de ce connecter
    
    if(playerData.socketID === syncManager.socket.id)
    {   
        playerData.type = PlayerType.local;
        setInterval(syncUpdate, syncManager.config.sendDelay);
    }
    else
        playerData.type = PlayerType.remote;

    syncManager.players.set(playerData.socketID, new Player(playerData));
    console.log(`New player created`, syncManager.players.get(playerData.socketID));
}

function syncUpdate()
{
    if(syncManager.players.has(syncManager.socket.id))
    {   
        const playerData = syncManager.players.get(syncManager.socket.id).data;

        //console.log(playerData);

        syncManager.socket.emit('syncPos', playerData);
    }
}

function onGetPlayerPos(playerData : PlayerData)
{
    if(playerData.socketID !== syncManager.socket.id)
    {
        if(syncManager.players.has(playerData.socketID))
        {
            console.log('sync', playerData);

            const player = syncManager.players.get(playerData.socketID);
    
            // Testing zone

            const leeway = 0.1; 

            player.pos.x += (playerData.pos.x - player.pos.x) * leeway;
            player.pos.y += (playerData.pos.y - player.pos.y) * leeway;
            
            //player.segments = playerData.segments;
    
            syncManager.players.set(playerData.socketID, player);
        }
    }
}

function onPlayerLeave(playerData : PlayerData)
{
    console.log(`player ${playerData.name} leaving`);

    console.log(`deleting player ${playerData.name}`);
    syncManager.players.delete(playerData.socketID);
}