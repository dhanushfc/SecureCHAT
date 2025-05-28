<<<<<<< HEAD
import { Component, input, OnInit, output } from '@angular/core';
import { IonButtons, IonModal, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonImg, IonAvatar, IonItem, } from '@ionic/angular/standalone';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonModal, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonImg, IonAvatar, IonItem,],
})
export class UsersComponent  implements OnInit {


  users = input<User[] | null>([]);
  close = output<boolean>();
  user = output<User>();

  constructor() { }

  ngOnInit() {}

  closeModal() {
    this.close.emit(true);
  }

  startChat(user: User){
    this.user.emit(user);

  }

}
=======
import { Component, input, OnInit, output } from '@angular/core';
import { IonButtons, IonModal, IonButton, IonIcon, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonImg, IonAvatar, IonItem, } from '@ionic/angular/standalone';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
  standalone: true,
  imports: [IonIcon, IonButton, IonModal, IonButtons, IonContent, IonHeader, IonTitle, IonToolbar, IonList, IonLabel, IonImg, IonAvatar, IonItem,],
})
export class UsersComponent  implements OnInit {


  users = input<User[] | null>([]);
  close = output<boolean>();
  user = output<User>();

  constructor() { }

  ngOnInit() {}

  closeModal() {
    this.close.emit(true);
  }

  startChat(user: User){
    this.user.emit(user);

  }

}
>>>>>>> 6696688f7c9b5c348538fe38556b2ca217b986ae
