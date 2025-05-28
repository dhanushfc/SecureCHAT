<<<<<<< HEAD
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonModal, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonImg, IonAvatar, IonItem, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, arrowBack } from 'ionicons/icons';
import { UsersComponent } from 'src/app/components/users/users.component';
import { ChatRoomService } from 'src/app/services/chat-room/chat-room.service';
import { User } from 'src/app/interfaces/user';
import { NavigationExtras, Router } from '@angular/router';
import { ChatRoom } from 'src/app/interfaces/chat-room';
import { EmptyScreenComponent } from 'src/app/components/empty-screen/empty-screen.component';



@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonModal, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonImg, IonAvatar, IonItem, UsersComponent, CommonModule, FormsModule, EmptyScreenComponent]
})
export class ChatsPage implements OnInit {

  isNewChat = signal<boolean>(false);
  users = computed<User[] | null>(() => this.chatroom.users());
  chatrooms = computed<ChatRoom[] | null>(() => this.chatroom.chatrooms());

  model = {
    icon: 'chatbubbles-outline',
    title: 'No Chat Rooms',
    color: 'primary',
  };

  private router = inject(Router);
  private chatroom = inject(ChatRoomService);

  constructor() { 
    addIcons({
      addCircle,
      arrowBack,
    });
  }

  ngOnInit() {
    this.chatroom.init();
  }

  setIsNewChat(value: boolean){
    if(!this.users() || this.users()?.length! == 0)
    this.chatroom.getUsers();

    this.isNewChat.set(value);

  }

  async startChat(user: User, modal: IonModal){
    try{
      const room = await this.chatroom.createChatRoom([user.uid], user.name);
      //dismiss
      modal.dismiss();

      //navigate to chat page
      this.navigateToChat(user?.name, room?.id);

    }catch(e){
      console.log(e);

    }
  }

  getChat(chatroom: ChatRoom) {
    this.navigateToChat(chatroom?.name!, chatroom?.roomId);
  }

  navigateToChat(name: string, id: string){
    const navData: NavigationExtras = {
      queryParams: {
        name

      }
    };
    this.router.navigate(['/', 'tabs', 'chats', id], navData);
  }

  ngOnDestroy(){
    console.log('chats ondestroy');
    this.chatroom.cleanup();
  }

}
=======
import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonButtons, IonModal, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonImg, IonAvatar, IonItem, } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { addCircle, arrowBack } from 'ionicons/icons';
import { UsersComponent } from 'src/app/components/users/users.component';
import { ChatRoomService } from 'src/app/services/chat-room/chat-room.service';
import { User } from 'src/app/interfaces/user';
import { NavigationExtras, Router } from '@angular/router';
import { ChatRoom } from 'src/app/interfaces/chat-room';
import { EmptyScreenComponent } from 'src/app/components/empty-screen/empty-screen.component';



@Component({
  selector: 'app-chats',
  templateUrl: './chats.page.html',
  styleUrls: ['./chats.page.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonModal, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonImg, IonAvatar, IonItem, UsersComponent, CommonModule, FormsModule, EmptyScreenComponent]
})
export class ChatsPage implements OnInit {

  isNewChat = signal<boolean>(false);
  users = computed<User[] | null>(() => this.chatroom.users());
  chatrooms = computed<ChatRoom[] | null>(() => this.chatroom.chatrooms());

  model = {
    icon: 'chatbubbles-outline',
    title: 'No Chat Rooms',
    color: 'primary',
  };

  private router = inject(Router);
  private chatroom = inject(ChatRoomService);

  constructor() { 
    addIcons({
      addCircle,
      arrowBack,
    });
  }

  ngOnInit() {
    this.chatroom.init();
  }

  setIsNewChat(value: boolean){
    if(!this.users() || this.users()?.length! == 0)
    this.chatroom.getUsers();

    this.isNewChat.set(value);

  }

  async startChat(user: User, modal: IonModal){
    try{
      const room = await this.chatroom.createChatRoom([user.uid], user.name);
      //dismiss
      modal.dismiss();

      //navigate to chat page
      this.navigateToChat(user?.name, room?.id);

    }catch(e){
      console.log(e);

    }
  }

  getChat(chatroom: ChatRoom) {
    this.navigateToChat(chatroom?.name!, chatroom?.roomId);
  }

  navigateToChat(name: string, id: string){
    const navData: NavigationExtras = {
      queryParams: {
        name

      }
    };
    this.router.navigate(['/', 'tabs', 'chats', id], navData);
  }

  ngOnDestroy(){
    console.log('chats ondestroy');
    this.chatroom.cleanup();
  }

}
>>>>>>> 6696688f7c9b5c348538fe38556b2ca217b986ae
