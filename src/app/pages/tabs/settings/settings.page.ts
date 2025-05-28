<<<<<<< HEAD
import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonIcon, IonButton, IonList, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { power } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonIcon, IonList, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar]
})
export class SettingsPage implements OnInit {

  private auth = inject(AuthService);

  constructor() { 
    addIcons({
      power,
    });
  }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
=======
import { Component, inject, OnInit } from '@angular/core';
import { IonContent, IonIcon, IonButton, IonList, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { power } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
  standalone: true,
  imports: [IonContent, IonButton, IonIcon, IonList, IonItem, IonLabel, IonHeader, IonTitle, IonToolbar]
})
export class SettingsPage implements OnInit {

  private auth = inject(AuthService);

  constructor() { 
    addIcons({
      power,
    });
  }

  ngOnInit() {
  }

  logout(){
    this.auth.logout();
  }

}
>>>>>>> 6696688f7c9b5c348538fe38556b2ca217b986ae
