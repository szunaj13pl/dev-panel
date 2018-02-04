import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import * as _ from 'lodash';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
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
        this.dockerApiService.containerOperations(container, host, 'start');
    }

}

