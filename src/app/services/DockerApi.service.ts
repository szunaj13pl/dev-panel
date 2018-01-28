import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {DockerContainersService} from './DockerContainers.service';

@Injectable()
export class DockerApiService {
    host: string;
    containers = [];

    constructor(private httpClient: HttpClient,
                private dockerContainers: DockerContainersService) {
    }

    http() {
        const params = new HttpParams().set('all', 'true');
        return this.httpClient.get('http://localhost:2375/containers/json', {params});
    }

    test() {
        console.log('DockerApiService is working ');
        this.dockerContainers.test();
        this.http().subscribe(
            data => {
                console.log(data);
            }, (e) => {
                console.log('Error', e);
            }, () => {
                console.log('complete');
            }
        );
    }
}
