import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Subscription} from 'rxjs/Subscription';
import {Container} from '../../../models/Container.model';
import {Host} from '../../../models/Host.model';
import {DockerApiService} from '../../../services/DockerApi.service';

@Component({
    selector: 'app-docker',
    templateUrl: './docker.component.html',
    styleUrls: ['./docker.component.scss'],
})
export class DockerComponent implements OnInit {

    @Input() container: Container;
    @Input() host: Host;
    @Output() updateServer = new EventEmitter<boolean>();

    private interval: number;
    private display: boolean;
    private alive: boolean;
    private logs: Subscription;

    constructor(private dockerApiService: DockerApiService) {
        this.interval = 1000;
        this.display = false;
        this.alive = true;
    }

    ngOnInit() {
        TimerObservable.create(0, this.interval)
            .takeWhile(() => this.alive)
            .subscribe(
                () => {

                    this.checkForUpdate();
                    if (!this.display) {
                        this.display = true;
                    }
                }, e => {
                    console.log(e);

                    if (!this.display) {
                        this.display = false;
                    }

                });
    }

    checkForUpdate() {
        const container = this.dockerApiService.checkContainerListForUpdate(this.container);

        if (container) {
            if (!_.isEqual(container, this.container)) {
                // console.log('New versione of container', container, this.container);
                this.container = container;
            }
        } else {
            this.display = false;
            this.alive = false;
            this.updateServer.emit(true);
        }

    }


    operations(operation: string, host: Host = this.host, container: Container = this.container) {
        // console.log('start ', container, 'host', host);
        this.dockerApiService.containerOperations(container, host, operation);
    }


    getLogs() {
        this.dockerApiService.getLogs(this.container, this.host, 'logs').subscribe(data => {
            console.log(data);
            this.logs = data;
            // return data;
            // },
            // err => {
            //     console.groupCollapsed('Error');
            //     console.log('Error: ' + err.error);
            //     console.log('Name: ' + err.name);
            //     console.log('Message: ' + err.message);
            //     console.log('Status: ' + err.status);
            //     console.groupEnd();
        });

    }

    getLogsStream() {
        this.dockerApiService.getLogsStream(this.container, this.host, 'attach').subscribe(data => {
            console.log(data);
            this.logs = data;
        });

    }


}

