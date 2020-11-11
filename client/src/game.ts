function setup()
{
    createCanvas(1900, 900);
    DOM.canvas = document.getElementById('defaultCanvas0');
    DOM.canvas.hidden = true;
}

function onJoiningGame(localPlayerConfig : any, event : any)
{
    SyncManagerClient.connect(localPlayerConfig); 
}

function draw()
{
    background(0, 0, 0, 256);

    //TODO : proprifier ça

    for(const player of Player.instances.values())
    {
        player.draw();
    }
}