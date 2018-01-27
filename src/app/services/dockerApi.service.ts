// @Injectable
export class DockerApiService {
    host: string;
    containers = [];

    constructor() {
    }

    test() {
        console.log('DockerApiService is working ');
    }
}