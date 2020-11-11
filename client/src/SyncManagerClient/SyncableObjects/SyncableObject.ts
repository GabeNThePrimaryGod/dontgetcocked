type Pos = { 
    x: any;
    y: any;
};

type SyncableObjectData = {
    pos: Pos
}

/**
 * 
 * 
 * 
 */
class SyncableObject {
    
    pos : Pos;

    constructor(config : any) 
    {
        this.pos = config.pos || {
            x: 0, 
            y: 0
        };

    }

    get data() : SyncableObjectData
    {
        return {
            pos: this.pos
        };
    }
}