export class Quiz{
    #roomId;
    #hasStarted;
    constructor(roomId, hasStarted=false){
        this.#roomId = roomId;
        this.#hasStarted = hasStarted;
    }
}