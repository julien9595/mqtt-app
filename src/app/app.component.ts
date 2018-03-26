import {Component, OnInit} from '@angular/core';
import {MqttMessage, MqttService} from 'ngx-mqtt';
import {Observable} from 'rxjs/Observable';

export const MQTT_SERVICE_OPTIONS = {
  hostname: 'm23.cloudmqtt.com',
  port: 14962,
  path: '/'
};

export function mqttServiceFactory() {
  return new MqttService(MQTT_SERVICE_OPTIONS);
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  public myOtherMessage$: Observable<MqttMessage>;
  public myMessage: string;

  constructor(private _mqttService: MqttService) {
  }

  ngOnInit() {
    this._mqttService.observe('my/topic').subscribe((message: MqttMessage) => {
      this.myMessage = message.payload.toString();
    });
    this.myOtherMessage$ = this._mqttService.observe('my/other/topic');
  }

  public unsafePublish(topic: string, message: string): void {
    this._mqttService.unsafePublish(topic, message, {qos: 1, retain: true});
  }
}
