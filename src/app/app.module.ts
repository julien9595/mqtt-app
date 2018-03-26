import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';


import {AppComponent} from './app.component';
import {NgxMqttClientModule} from 'ngx-mqtt-client';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxMqttClientModule.forRoot({
      host: 'm23.cloudmqtt.com',
      protocol: 'wss',
      port: 34962,
      path: '/',
      username: 'luhaecsz',
      password: 'ZRcgNphNFfBe'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
