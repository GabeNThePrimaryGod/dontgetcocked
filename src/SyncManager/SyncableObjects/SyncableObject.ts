export type Position = { 
    x: any;
    y: any;
};

export type SyncableObjectData = {
    pos: Position
}

/**
 * 
 * 
 * 
 */
export class SyncableObject {
    
    pos : Position;

    constructor(config : any) 
    {
        this.pos = config.pos || {x: 0, y:0};

    }

    get data() : SyncableObjectData
    {
        return {
            pos: this.pos
        };
    }
}