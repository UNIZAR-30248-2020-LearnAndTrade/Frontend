import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { user } from 'src/app/models/user';
import { chatMessage } from 'src/app/models/chatMessage';
import { chatNotification } from 'src/app/models/chatNotification';
import { chatRoom } from 'src/app/models/chatRoom';
import { homepageComponent } from '../components/pages/homepage/homepage.component';
import { ChatComponent } from '../components/pages/chat/chat.component';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  webSocketEndPoint: string = 'https://learn-and-trade.herokuapp.com/ws';
  topic: string = "/user/pr2/queue/messages";
  stompClient: any;
  newMensaje: chatMessage;

  constructor(){

  }

  _connect() {
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
        console.log("SDK EVENT:");
        console.log(sdkEvent);
        _this.onMessageReceived(sdkEvent);
      });
      _this.stompClient.reconnect_delay = 2000;
    }, this.errorCallBack);
  };

  _disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log("Disconnected");
  }

  // on error, schedule a reconnection attempt
  errorCallBack(error) {
    console.log("errorCallBack -> " + error)
    setTimeout(() => {
      this._connect();
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {
    let newMensaje2 = {
      senderId: 'prueba1',
      recipientId: 'pr2',
      senderName: 'PRUEBA 1',
      recipientName: 'PR 2',
      content: message,
      timestamp: new Date()
    }


    this.stompClient.send("/app/chat", {}, JSON.stringify(newMensaje2));
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
    console.log(JSON.stringify(message.body));
  }

}
