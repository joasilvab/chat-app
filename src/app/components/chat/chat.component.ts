import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Message } from 'src/app/models/message';
import { User } from 'src/app/models/user';
import { ChatService } from 'src/app/services/chat.service';
import { PostService } from 'src/app/services/post.service';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  user: User = new User();
  messages: Message[] = [];
  messageControl = new FormControl();
  messageReceivedSubscription: Subscription;

  constructor(private userService: UserService,
    private chatService: ChatService,
    private postService: PostService
  ) {
    this.user = userService.getUser();
    this.messageReceivedSubscription = this.chatService.messageReceived.subscribe(
      next => this.messages.push(next)
    );
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      response => { this.messages.push(...response) }
    );
    this.chatService.messageReceived.subscribe();
  }

  send() {
    var message = new Message();
    message = { message: this.messageControl.value, user: this.userService.getUser() };
    this.chatService.sendMessage(message);
  }

  ngOnDestroy() {
    this.messageReceivedSubscription.unsubscribe();
  }
}
