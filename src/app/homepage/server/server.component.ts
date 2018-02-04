import {Component, NgZone, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/takeWhile';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Container} from '../../models/Container.model';
import {DockerApiService} from '../../services/DockerApi.service';


@Component({
    selector: 'app-server',
    templateUrl: './server.component.html',
    styleUrls: ['./server.component.scss']
})
export class ServerComponent implements OnInit, OnDestroy {

    private containers: Container[] = [];

    private updateServer: boolean;
    private display: boolean;
    private interval: number;
    private alive: boolean; // used to unsubscribe from the TimerObservable when OnDestroy is called.


    constructor(private dockerApiService: DockerApiService, private zone: NgZone) {
        this.display = false;
        this.alive = true;
        this.interval = 1000;
        this.updateServer = true;
    }

    ngOnInit() {
        this.dockerApiService.getData();

        TimerObservable.create(0, this.interval)
            .takeWhile(() => this.alive)
            .subscribe(
                () => {

                    this.dockerApiService.getData();
                    if (!this.display) {
                        this.display = true;
                    }

                });

        this.dockerApiService.containersList$.subscribe(
            data => {

                const containersListIsEmpty = this.containers.length === 0;

                if ((this.updateServer) || (containersListIsEmpty)) {
                    this.containers = data;
                    this.updateServer = false;
                    // console.log(data, 'server component', this.containers);
                }

            });
    }

    ngOnDestroy() {
        this.alive = false; // switches your TimerObservable off
    }

    logData() {
        console.log(this.containers);

        this.alive = !this.alive;
        console.log(this.alive);
    }

    updateServerEvent($event) {
        // console.log('event');
        this.updateServer = $event;
    }

}
