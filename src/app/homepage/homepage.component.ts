import {Component, OnInit} from '@angular/core';

@Component({
    selector: 'app-homepage',
    templateUrl: './homepage.component.html',
    styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
    private hosts = [
        {
            name: 'localhost',
            address: '127.0.0.1',
            port: 2375,
        }
    ];

    constructor() {
    }

    ngOnInit() {
    }

}
