type PlayerPosition = { 
    x: any,
    y: any
};

type PlayerTail = {
    x: any,
    y: any,
    angle: any
}

type PlayerData = {
    socketID: string,
    pos: PlayerPosition,
    name: string,
    type: PlayerType
}

enum PlayerType { "remote", "local" }

class Player
{
    name : string
    type : PlayerType
    pos : PlayerPosition
    segments : [ PlayerTail ] | any
    segLength : any
    easing : any
    dashEasing : any

    constructor(playerData : PlayerData)
    {
        this.name = playerData.name || "";
        this.type = playerData.type || PlayerType.remote;   // remote | local

        this.pos = {x:width / 2, y:height / 2};
        this.segments = [];

        this.segLength = 5;

        this.easing = 0.05;
        this.dashEasing = 0.5;

        // création de tout les segments du corp
        for (let i = 0; i < 25; i++) 
        {
            this.segments.push({x:this.pos.x, y:this.pos.y});
        }
    }

    get segCount() { return this.segments.length; }

    draw()
    {
        if(this.type === PlayerType.local)
        {
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
        
        for(let i = 0; i < this.segCount - 1; i++)
        {
            this.dragSegment(this.segments[i], this.segments[i + 1]);
        }

        this.displayName();
    }

    dragSegment(segement : PlayerTail | PlayerPosition, nextSegment : PlayerTail) 
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

    get data()
    {
        return {name:this.name, pos:this.pos, segments: this.segments};
    }
}