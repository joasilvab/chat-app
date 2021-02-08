import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { Message } from 'src/app/models/message';
import { ChatService } from 'src/app/services/chat.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

  loadingMessages: boolean = true;
  username: string = '';
  messages: Message[] = [];
  messageControl = new FormControl();
  messageReceivedSubscription: Subscription;

  constructor(private authService: AuthService,
    private chatService: ChatService,
    private postService: PostService
  ) {
    this.username = authService.getClaims().username;
    this.messageReceivedSubscription = this.chatService.messageReceived.subscribe(
      next => this.messages.push(next)
    );
  }

  ngOnInit(): void {
    this.postService.getPosts().subscribe(
      response => { 
        this.messages.push(...response);
        this.loadingMessages = false;
      }
    );
    this.chatService.messageReceived.subscribe();
  }

  send() {
    var message = new Message();
    message = { message: this.messageControl.value, username: this.username };
    this.chatService.sendMessage(message);
  }

  ngOnDestroy() {
    this.messageReceivedSubscription.unsubscribe();
  }
}
