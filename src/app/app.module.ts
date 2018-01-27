import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {HomepageComponent} from './homepage/homepage.component';
import {ServerComponent} from './homepage/server/server.component';
import {DockerComponent} from './homepage/server/docker/docker.component';
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
        BrowserModule
    ],
    providers: [DockerApiService, DockerContainersService],
    bootstrap: [AppComponent]
})
export class AppModule {
}
