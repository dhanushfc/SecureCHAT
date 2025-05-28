<<<<<<< HEAD
import { Component, OnInit, signal } from '@angular/core';
import { IonTabButton,IonIcon,IonTabs,IonTabBar, } from '@ionic/angular/standalone';
import { call, callOutline, chatbubble, chatbubbleOutline, chatbubbles, chatbubblesOutline, cog, cogOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabBar,IonTabs,IonIcon,IonTabButton],
})
export class TabsPage implements OnInit {

  selectedTab = signal<string>('chats');

  constructor() {
    addIcons({
      chatbubbleOutline,
      cogOutline,
      callOutline,
      chatbubblesOutline,
      chatbubble,
      call,
      chatbubbles,
      cog
    })
   }

  ngOnInit() {}

  getSelected(event: any) {
    console.log(event);
    this.selectedTab.set(event?.tab);
  }
}
=======
import { Component, OnInit, signal } from '@angular/core';
import { IonTabButton,IonIcon,IonTabs,IonTabBar, } from '@ionic/angular/standalone';
import { call, callOutline, chatbubble, chatbubbleOutline, chatbubbles, chatbubblesOutline, cog, cogOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
  standalone: true,
  imports: [IonTabBar,IonTabs,IonIcon,IonTabButton],
})
export class TabsPage implements OnInit {

  selectedTab = signal<string>('chats');

  constructor() {
    addIcons({
      chatbubbleOutline,
      cogOutline,
      callOutline,
      chatbubblesOutline,
      chatbubble,
      call,
      chatbubbles,
      cog
    })
   }

  ngOnInit() {}

  getSelected(event: any) {
    console.log(event);
    this.selectedTab.set(event?.tab);
  }
}
>>>>>>> 6696688f7c9b5c348538fe38556b2ca217b986ae
