export class Container {
    public host?: string;
    public id?: string;
    public name?: string;
    public image?: string;
    public category?: string;
    public projectName?: string;
    public database?: string;
    public projektUrl?: string;
    public ip?: string;
    public port?: string;
    public online?: string;
    public uptime?: string;
    public branch?: string;
    public configuration?: string;
    public configurationUrl?: string;
    public databaseUrl?: string;
    public description?: string;

    constructor(Id: string, Image: string, State: string, Status: string) {
        this.id = Id;
        this.image = Image;
        this.online = State;
        this.uptime = Status;
    }

}
