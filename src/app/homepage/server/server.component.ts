import {Component, OnDestroy, OnInit} from '@angular/core';
import 'rxjs/add/operator/skipWhile';
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

    private display: boolean;

    private alive: boolean; // used to unsubscribe from the TimerObservable
                            // when OnDestroy is called.
    private interval: number;


    constructor(private dockerApiService: DockerApiService) {
        this.display = false;
        this.alive = true;
        this.interval = 1000;
    }

    ngOnInit() {

        TimerObservable.create(0, this.interval)
            .takeWhile(() => this.alive)
            .subscribe(() => {
                this.dockerApiService.http()
                    .subscribe((data) => {
                        this.containers = data.map(item => {
                            return new Container(
                                item.Id,
                                item.Image,
                                item.State,
                                item.Status
                            );
                        });
                        console.log('stacoverflow', this.containers);
                        if (!this.display) {
                            this.display = true;
                        }
                    });
            }, e => console.log('Error: ', e));


        // this.dockerApiService.containersList$.subscribe(
        //     data => {
        //         console.log('server.component', data);
        //         this.containers = data;
        //     },
        //     e => {
        //         console.log(e);
        //     },
        //     () => {
        //         console.log('Complete');
        //     }
        // );
    }

    ngOnDestroy() {
        this.alive = false; // switches your TimerObservable off
    }

    getNextData() {
        this.dockerApiService.test();
    }

    fetchData() {
        this.dockerApiService.http();
    }

    logData() {
        console.log(this.containers);
        this.alive = !this.alive;
        console.log(this.alive);
    }
}
