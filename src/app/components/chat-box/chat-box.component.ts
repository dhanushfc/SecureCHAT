<<<<<<< HEAD
import { DatePipe } from '@angular/common';
import { Component, input, OnInit, } from '@angular/core';
import { IonItem, IonText, IonNote, IonIcon  } from '@ionic/angular/standalone';
import { Chat } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  standalone: true,
  imports: [IonItem, IonText, IonIcon, IonNote, DatePipe ],
})
export class ChatBoxComponent  implements OnInit {

  chat = input<Chat | null>(null);

  constructor() { }

  ngOnInit() {}

}
=======
import { DatePipe } from '@angular/common';
import { Component, input, OnInit, } from '@angular/core';
import { IonItem, IonText, IonNote, IonIcon  } from '@ionic/angular/standalone';
import { Chat } from 'src/app/interfaces/chat';

@Component({
  selector: 'app-chat-box',
  templateUrl: './chat-box.component.html',
  styleUrls: ['./chat-box.component.scss'],
  standalone: true,
  imports: [IonItem, IonText, IonIcon, IonNote, DatePipe ],
})
export class ChatBoxComponent  implements OnInit {

  chat = input<Chat | null>(null);

  constructor() { }

  ngOnInit() {}

}
>>>>>>> 6696688f7c9b5c348538fe38556b2ca217b986ae
