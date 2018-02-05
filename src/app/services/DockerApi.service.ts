import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Container} from '../models/Container.model';
import {Host} from '../models/Host.model';
import {DockerContainersService} from './DockerContainers.service';

@Injectable()
export class DockerApiService {

    private containersListSubject = new BehaviorSubject([]);

    public containersList$: Observable<Container[]> = this.containersListSubject.asObservable();

    private newContainers: Container[];


    constructor(private httpClient: HttpClient,
                private dockerContainers: DockerContainersService) {
    }

    test() {
        this.httpClient.post('http://127.0.0.1:2375/containers/44985cdd43bad41a688ede7a93629ba99184ca555054855050d502a76ac023d5/start', {}).subscribe(
            data => console.log(data));
    }

    http(host: Host,
         params: any = {},
         category: string = 'containers',
         task?: string = '',
         method?: string = 'get',
         variable?: string): Observable<any> {

        let url = `http://${host.address}:${host.port}/${category}/${task}`;

        if (variable) {
            url = `http://${host.address}:${host.port}/${category}/${variable}/${task}`;
        }

        switch (method) {
            case 'post':
                // console.log(url, method, task, variable);
                return this.httpClient.post(url, params);
            case 'get':
                return this.httpClient.get<any>(url, {params});
            case 'options':
                break;
            case 'delete':
                break;
        }
        console.log('no method for API matched');
    }

    getData(host: Host) {
        this.http(host,
            new HttpParams().set('all', 'true'), 'containers'
            , 'json',
            'get'
        ).subscribe((data) => {

            // console.log(host);

            this.newContainers = data.map(item => {
                return new Container(
                    item.Id,
                    item.Image,
                    item.State,
                    item.Status
                );
            }, e => console.log('Error: ', e));

            // console.log('service', this.newContainers);

            this.updateContainersList(this.newContainers);
        });
    }

    updateContainersList(newList: Container[]) {
        this.containersListSubject.next(_.cloneDeep(newList));
    }

    checkContainerListForUpdate(container: Container) {
        return this.newContainers.find(function (obj) {
            return obj.id === container.id;
        });
    }

    containerOperations(container: Container, host: Host, operation: string) {

        console.groupCollapsed('Parameters');
        console.log(container, host, operation);
        console.groupEnd();

        const request = this.http(host, {}, 'containers', operation, 'post', container.id);

        request.subscribe(data => console.log(data),
            err => {
                console.groupCollapsed('Error');
                console.log('Error: ' + err.error);
                console.log('Name: ' + err.name);
                console.log('Message: ' + err.message);
                console.log('Status: ' + err.status);
                console.groupEnd();
            });
    }

    private cloneContainers() {
        return _.cloneDeep(this.containersListSubject.getValue());
    }

}
