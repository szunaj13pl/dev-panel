import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TimerObservable} from 'rxjs/observable/TimerObservable';
import {Container} from '../../../models/Container.model';
import {DockerApiService} from '../../../services/DockerApi.service';

@Component({
    selector: 'app-docker',
    templateUrl: './docker.component.html',
    styleUrls: ['./docker.component.scss'],
})
export class DockerComponent implements OnInit {
    @Input() container: Container;
    @Output() updateServer = new EventEmitter<boolean>();
    interval: number;

    constructor(private dockerApiService: DockerApiService) {
        this.interval = 1000;
    }

    ngOnInit() {
        TimerObservable.create(0, this.interval)
        // .takeWhile(() => this.alive)
            .subscribe(
                () => {

                    this.checkForUpdate();
                    // if (!this.display) {
                    //     this.display = true;
                    // }

                });
    }

    checkForUpdate() {
        const container = this.dockerApiService.checkContainerListForUpdate(this.container);

        if (container) {
            if (!_.isEqual(container, this.container)) {
                console.log('New versione of container', container, this.container);
                this.container = container;
            }
        } else {
            this.updateServer.emit(true);
        }

    }


}

