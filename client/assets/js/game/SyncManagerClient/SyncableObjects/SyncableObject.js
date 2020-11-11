/**
 *
 *
 *
 */
class SyncableObject {
    constructor(config) {
        this.pos = config.pos || {
            x: 0,
            y: 0
        };
    }
    get data() {
        return {
            pos: this.pos
        };
    }
}
