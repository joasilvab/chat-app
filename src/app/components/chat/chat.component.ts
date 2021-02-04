import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  username: string;
  messages: Message[] = [];
  messageControl = new FormControl();
  messageReceivedSubscription: Subscription;

  constructor(private userService: UserService,
    private chatService: ChatService
  ) {
    this.username = userService.getUsername();
    this.messageReceivedSubscription = this.chatService.messageReceived.subscribe(
      next => this.messages.push(next)
    );
  }

  ngOnInit(): void {
    this.chatService.messageReceived.subscribe();
  }

  send() {
    var message = new Message();
    message = { message: this.messageControl.value, user: this.userService.getUsername() };
    this.chatService.sendMessage(message);
  }

  ngOnDestroy() {
    this.messageReceivedSubscription.unsubscribe();
  }
}
