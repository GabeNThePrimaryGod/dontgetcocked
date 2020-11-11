type PlayerTailNode = Pos & {
    angle: any
}

type PlayerData = SyncableObjectData & {
    socketID: string,
    name: string,
    type: PlayerType
}

enum PlayerType { "remote", "local" }

class Player extends SyncableObject
{
    name : string
    type : PlayerType
    socketID : string

    segments : [ PlayerTailNode ] | any
    segLength : any
    easing : any
    dashEasing : any

    constructor(playerData : PlayerData)
    {
        super(playerData);

        // si le socket id du nouveau joueur === le notre ça veut dire que c'est le joueur local qui viens de ce connecter
        
        if(playerData.socketID === SyncManagerClient.socket.id)
        {   
            if(Player.localPlayer) throw new Error('local player allready connected');

            Player.localPlayer = this;
            playerData.type = PlayerType.local;

            // lorsque le joueur local ce connecte on initialise la boucle de synchronisation d'évenements du syncManager
            // TODO : Proprifier ?
            setInterval(SyncManagerClient.syncUpdate, SyncManagerClient.config.sendDelay);
        }
        else
            playerData.type = PlayerType.remote;
    
        Player.instances.set(playerData.socketID, this);
        console.log(`New player created`, Player.instances.get(playerData.socketID));

        this.name = playerData.name || "";
        this.socketID = playerData.socketID;
        this.type = playerData.type || PlayerType.remote;

        this.init();
    }
    
    init()
    {
        //TODO : implement spawning system server side
        this.pos = {
            x: width / 2, 
            y: height / 2
        };

        this.segments = [];

        this.segLength = 5;

        this.easing = 0.05;
        this.dashEasing = 0.5;

        // création de tout les segments du coup
        for (let i = 0; i < 25; i++) 
        {
            this.segments.push({x:this.pos.x, y:this.pos.y});
        }
    }

    draw()
    {
        if(this.type === PlayerType.local)
        {
            //TODO : Mettre une vitesse max au joueurs, check server side ?

            this.pos.x += (mouseX - this.pos.x) * this.easing;
            this.pos.y += (mouseY - this.pos.y) * this.easing;
        }
        
        // https://p5js.org/examples/interaction-follow-3.html

        this.drawPlayer();
    }

    drawPlayer()
    {
        strokeWeight(9);
        stroke(255, 100);
        this.dragSegment(this.pos, this.segments[0]);
        
        for(let i = 0; i < this.segments.length - 1; i++)
        {
            this.dragSegment(this.segments[i], this.segments[i + 1]);
        }

        this.displayName();
    }

    dragSegment(segement : PlayerTailNode | Pos, nextSegment : PlayerTailNode) 
    {
        const dx = segement.x - nextSegment.x;
        const dy = segement.y - nextSegment.y;
        const angle = atan2(dy, dx);
        nextSegment.x = segement.x - cos(angle) * this.segLength;
        nextSegment.y = segement.y - sin(angle) * this.segLength;
        nextSegment.angle = angle;

        push();
        translate(nextSegment.x, nextSegment.y);
        rotate(angle);
        line(0, 0, this.segLength, 0);
        pop();
    }

    displayName()
    {
        noStroke();
        fill(255);
        textSize(15);
        textAlign(CENTER, CENTER);
        text(this.name, this.pos.x, this.pos.y - 30);
    }

    get data() : PlayerData
    {
        const data = super.data as PlayerData;
        data.name = this.name;
        data.socketID = this.socketID;
        return data;
    }

    // static zone

    public static localPlayer = null as Player | undefined;

    public static instances = new Map<string, Player>();

    public static onNewPlayer(playerData : PlayerData) : void
    {
        new Player(playerData);
    }

    public static onPlayerLeave(playerData : PlayerData)
    {
        console.log(`player ${playerData.name} leaving`);
        Player.instances.delete(playerData.socketID);
    }

    public static onGetPlayerPos(playerData : PlayerData)
    {
        if(playerData.socketID !== SyncManagerClient.socket.id)
        {
            if(Player.instances.has(playerData.socketID))
            {
                console.log('sync player pos', playerData);
    
                const player = Player.instances.get(playerData.socketID);
        
                // TODO : voir un systeme de leeway un peut moins dégeu
                // TODO : sync la position de la queue des joueurs
    
                // Testing zone
    
                player.pos.x += (playerData.pos.x - player.pos.x) * SyncManagerClient.config.leeway;
                player.pos.y += (playerData.pos.y - player.pos.y) * SyncManagerClient.config.leeway;
    
                //player.segments = playerData.segments;
        

                //TODO : wtf c'est vraiment necessaire (j'me souviens pu)?
                Player.instances.set(playerData.socketID, player);
            }
        }
    }

}