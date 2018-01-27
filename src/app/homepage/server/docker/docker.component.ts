import {Component, OnInit} from '@angular/core';
import {DockerApiService} from '../../../services/DockerApi.service';

@Component({
    selector: 'app-docker',
    templateUrl: './docker.component.html',
    styleUrls: ['./docker.component.scss']
})
export class DockerComponent implements OnInit {

    constructor(private dockerApi: DockerApiService) {
    }

    ngOnInit() {
        this.dockerApi.test();
    }

}
