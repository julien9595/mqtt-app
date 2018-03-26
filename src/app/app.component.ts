import {Component, OnInit} from '@angular/core';
import {ConnectionStatus, MqttService, SubscriptionGrant} from 'ngx-mqtt-client';

interface Foo {
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  _isConnected = 'CONNECTING';
  _messageToSend: string;
  _topicToSend: string;
  _topicToSubscribe: string;
  _messages: Array<Foo> = [];

  constructor(private _mqttService: MqttService) {
  }

  ngOnInit() {
    this._mqttService.status().subscribe((s: ConnectionStatus) => {
      this._isConnected = s === ConnectionStatus.CONNECTED ? 'CONNECTED' : 'DISCONNECTED';
      console.log(`Mqtt client connection status: ${this._isConnected}`);
    });
  }

  sendMsg(): void {
    this._mqttService.publishTo<Foo>(this._topicToSend, {message: this._messageToSend}).subscribe({
      next: () => console.log('message sent'),
      error: (error: Error) => console.error(`oopsie something went wrong could not sent message: ${error.message}`)
    });
  }

  subscribe(): void {
    this._mqttService.subscribeTo<Foo>(this._topicToSubscribe)
      .subscribe({
        next: (msg: SubscriptionGrant | Foo) => {
          if (msg instanceof SubscriptionGrant) {
            console.log('Successfully subscribed!');
          } else {
            this._messages.push(msg);
          }
        },
        error: (error: Error) => console.error(error.message)
      });
  }
}
