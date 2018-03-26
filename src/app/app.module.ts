import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent, mqttServiceFactory} from './app.component';
import {MqttModule, MqttService} from 'ngx-mqtt';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    MqttModule.forRoot({
      provide: MqttService,
      useFactory: mqttServiceFactory
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
