import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { user } from 'src/app/models/user';
import { chatMessage } from 'src/app/models/chatMessage';
import { chatNotification } from 'src/app/models/chatNotification';
import { chatRoom } from 'src/app/models/chatRoom';
import { homepageComponent } from '../components/pages/homepage/homepage.component';
import { ChatComponent } from '../components/pages/chat/chat.component';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import {Observable, Subscriber} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  webSocketEndPoint: string = 'https://learn-and-trade-backend.herokuapp.com/';
  topic: string = "/user/prD1/queue/messages";
  globalUsername = '';
  stompClient: any;
  newMensaje: chatMessage;

  subscriberHeader: Subscriber<chatMessage>;
  subscriberChat: Subscriber<chatMessage>;
  observableHeader: Observable<chatMessage>;
  observableChat: Observable<chatMessage>;

  constructor(private http: HttpClient){
    this.observableHeader = new Observable(observer => {
      this.subscriberHeader = observer;
    });
    this.observableChat = new Observable(observer => {
      this.subscriberChat = observer;
    });
  }

  getObserverHeader() {
    return this.observableHeader;
  }

  getObservableChat() {
    return this.observableChat;
  }

  _connect(username) {
    console.log("Initialize WebSocket Connection");
    this.globalUsername = username;
    let ws = new SockJS(this.webSocketEndPoint + "ws");
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
      _this.stompClient.subscribe("/user/" + username + "/queue/messages", function (sdkEvent) {
        /*console.log("SDK EVENT:");
        console.log(sdkEvent);
        _this.onMessageReceived(sdkEvent);*/
        _this.subscriberHeader.next(sdkEvent);
        _this.subscriberChat.next(sdkEvent);
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
      this._connect(this.globalUsername);
    }, 5000);
  }

  /**
   * Send message to sever via web socket
   * @param {*} message
   */
  _send(message) {
    this.stompClient.send("/app/chat", {}, JSON.stringify(message));
  }

  onMessageReceived(message) {
    console.log("Message Recieved from Server :: " + message);
    console.log(JSON.stringify(message.body));
  }

  countMessages(senderId, recipientId) {
    return this.http.get(this.webSocketEndPoint + "messages/" + senderId + "/" + recipientId + "/count");
  }

  countAnyMessages(recipientId) {
    return this.http.get(this.webSocketEndPoint + "messages/" + recipientId + "/count");
  }

  seeMessages(senderId, recipientId) {
    return this.http.get(this.webSocketEndPoint + "messages/" + senderId + "/" + recipientId);
  }

  createRoom(senderId, recipientId) {
    return this.http.get(this.webSocketEndPoint + "rooms/" + senderId + "/" + recipientId);
  }

  getRooms(senderId) {
    return this.http.get(this.webSocketEndPoint + "rooms/" + senderId );
  }

  makeHeaderCount() {
    this.subscriberHeader.next();
  }

}
