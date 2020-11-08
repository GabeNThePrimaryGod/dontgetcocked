import env from "../../env";
import { SyncableSocketObject, SyncableSocketObjectData } from "./SyncableSocketObject";
    
export type PlayerData = SyncableSocketObjectData & {
    name: string
}

export class Player extends SyncableSocketObject {

    name: string;

    constructor(config : any)
    {
        super(config);

        this.name = config.name || "UnamedPlayer";
    }

    get data() : PlayerData
    {
        const data = super.data as PlayerData;
        data.name = this.name;
        return data;
    }
}

export default Player;