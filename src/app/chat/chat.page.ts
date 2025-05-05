import { Component, OnInit } from '@angular/core';
import { ChatService, Message } from '../services/chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {

  messages:Message[] = [];
  newMessage: string = '';
  user: string = 'Usuario';

  constructor(private chatServices: ChatService) { }

  ngOnInit() {
    this.chatServices.getMessages().subscribe((msgs) => {
      this.messages = msgs;
    });
  }
  
  sendMessage(){
    if (this.newMessage.trim()){
      this.chatServices.sendMessage(this.newMessage, this.user);
      this.newMessage = '';
    }
  }
}
