var syncManager = new SyncManagerClient({
    sendDelay: 10,
    leeway: 0.1
});

function setup()
{
    createCanvas(1900, 900);
    DOM.canvas = document.getElementById('defaultCanvas0');
    DOM.canvas.hidden = true;
}

function onJoiningGame(localPlayerConfig : any, event : any)
{
    syncManager.connectClient(localPlayerConfig); 
}

function draw()
{
    background(0, 0, 0, 256);

    for(const player of syncManager.players.values())
    {
        player.draw();
    }
}