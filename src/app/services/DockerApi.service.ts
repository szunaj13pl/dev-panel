import {HttpClient, HttpParams} from '@angular/common/http';
import {Injectable} from '@angular/core';
import * as _ from 'lodash';
import 'rxjs/add/operator/map';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Container} from '../models/Container.model';
import {DockerContainersService} from './DockerContainers.service';

@Injectable()
export class DockerApiService {

    private containersListSubject = new BehaviorSubject([]);

    public containersList$: Observable<Container[]> = this.containersListSubject.asObservable();

    private dataObservable: Observable<any>;
    private newContainers: Container[];

    constructor(private httpClient: HttpClient,
                private dockerContainers: DockerContainersService) {
    }

    http(params: HttpParams = new HttpParams().set('all', 'true')): Observable<any> {
        return this.httpClient.get<any>('http://localhost:2375/containers/json', {params});
    }

    getData() {
        this.http().subscribe((data) => {


            this.newContainers = data.map(item => {
                return new Container(
                    item.Id,
                    item.Image,
                    item.State,
                    item.Status
                );
            }, e => console.log('Error: ', e));

            // console.log('service', this.newContainers);

            this.initializeContainersList(this.newContainers);
        });
    }

    initializeContainersList(newList: Container[]) {
        this.containersListSubject.next(_.cloneDeep(newList));
    }

    testData() {
        this.dataObservable.subscribe(x => console.log(x));
        console.log('testData');
    }

    private cloneContainers() {
        return _.cloneDeep(this.containersListSubject.getValue());
    }

    checkContainerListForUpdate(container: Container) {
        return this.newContainers.find(function (obj) {
            return obj.id === container.id;
        });
    }
}
