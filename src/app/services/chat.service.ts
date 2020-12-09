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
  
  
  constructor(){
    
  }


}
