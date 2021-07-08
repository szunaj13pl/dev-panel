import {HttpClientModule} from '@angular/common/http';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';
import {DockerComponent} from './homepage/server/docker/docker.component';
import {ServerComponent} from './homepage/server/server.component';
import {DockerApiService} from './services/DockerApi.service';
import {DockerContainersService} from './services/DockerContainers.service';


@NgModule({
    declarations: [
        AppComponent,
        HomepageComponent,
        ServerComponent,
        DockerComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        NgbModule.forRoot(),
    ],
    providers: [DockerApiService, DockerContainersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
