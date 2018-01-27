import {Injectable} from '@angular/core';
import {DockerContainersService} from './DockerContainers.service';

@Injectable()
export class DockerApiService {
    host: string;
    containers = [];

    constructor(private dockerContainers: DockerContainersService) {
    }

    test() {
        console.log('DockerApiService is working ');
        this.dockerContainers.test();
    }
}
