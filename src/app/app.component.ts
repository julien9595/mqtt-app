import {Component, OnInit} from '@angular/core';
import {ConnectionStatus, MqttService} from 'ngx-mqtt-client';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(private _mqttService: MqttService) {
  }

  ngOnInit() {
    this._mqttService.status().subscribe((s: ConnectionStatus) => {
      const status = s === ConnectionStatus.CONNECTED ? 'CONNECTED' : 'DISCONNECTED';
      console.log(`Mqtt client connection status: ${status}`);
    });
  }

}
