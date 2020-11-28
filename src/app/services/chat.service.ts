import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { user } from 'src/app/models/user';
import { chatMessage } from 'src/app/models/chatMessage';
import { chatNotification } from 'src/app/models/chatNotification';
import { chatRoom } from 'src/app/models/chatRoom';


@Injectable({
  providedIn: 'root'
})
export class ChatService {
  public miPerfil: user;
  public notification: chatNotification;
  webSocketEndPoint: string = 'https://learn-and-trade-backend.herokuapp.com/ws';
  topic: string = "/user/fer/queue/messages";
  stompClient: any;

  constructor() { }

  connect(){
    //var sock = new SockJS("https://learn-and-trade-backend.herokuapp.com/ws");
    //this.stompClient = Stomp.over(sock);
    //this.stompClient.connect({}, this.onConnected(), this.onError());
    
    console.log("Initialize WebSocket Connection");
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect({}, function (frame) {
        _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
            _this.onMessageReceived(sdkEvent);
        });
        //_this.stompClient.reconnect_delay = 2000;
    }, this.onError);
  }
  onConnected(){
      console.log("connected");
  
      this.stompClient.subscribe(
        "/user/" + this.miPerfil.username + "/queue/messages", this.onMessageReceived);
  }

  onMessageReceived(msg){
      console.log(msg);
      /*
      this.notification = JSON.parse(msg.body);
      const active = JSON.parse(sessionStorage.getItem("recoil-persist"))
        .chatActiveContact;
      if (active.id === this.notification.senderId) {
        findChatMessage(this.notification.id).then((message) => {
          const newMessages = JSON.parse(sessionStorage.getItem("recoil-persist"))
            .chatMessages;
          newMessages.push(message);
          setMessages(newMessages);
        });
      } else {
        message.info("Received a new message from " + notification.senderName);
      }
      loadContacts();*/
    }

  sendMessage(msg){
      if (msg.trim() !== "") {
        const message = {
          senderId: 'currentUser.id',
          recipientId: 'activeContact.id',
          senderName: 'currentUser.name',
          recipientName: 'activeContact.name',
          content: msg,
          timestamp: new Date(),
        };
        this.stompClient.send("/app/chat", {}, JSON.stringify(message));
  
        
      }
    } 

  onError(){
      console.log("Error connect");
  };

}
