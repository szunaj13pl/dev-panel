export class Host {
    public address: string;
    public port: string;
    public name?: string;
    public online?: string;

    constructor(host: string, port: string, name?: string, online?: string) {
        this.address = host;
        this.port = port;
        this.name = name;
        this.online = online;
    }
}
