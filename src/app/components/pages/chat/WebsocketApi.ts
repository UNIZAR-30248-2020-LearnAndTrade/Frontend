import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { homepageComponent } from '../homepage/homepage.component';
import { chatMessage } from '../../../models/chatMessage';

export class WebSocketAPI {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/user/ander/queue/messages";
    stompClient: any;
    newMensaje: chatMessage;
    homepageComponent: homepageComponent;
    constructor(homepageComponent: homepageComponent){
        this.homepageComponent = homepageComponent;
    }
    _connect() {
        console.log("Initialize WebSocket Connection");
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        const _this = this;
        console.log("CONECTANDO")
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
            senderId: 'fernando',
            recipientId: 'gonzalo',
            senderName: 'fernando',
            recipientName: 'Gonzalo',
            content: 'Hola. Mensaje de prueba',
            timestamp: new Date()
        }


        this.stompClient.send("/app/chat", {}, JSON.stringify(newMensaje2));
    }

    onMessageReceived(message) {
        console.log("Mensaje recibido");
        console.log(JSON.parse(message.body));
    }
}
