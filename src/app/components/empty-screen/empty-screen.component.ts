<<<<<<< HEAD
import { Component, input, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonIcon, IonLabel],
})
export class EmptyScreenComponent  implements OnInit {

  model = input<any>();

  constructor() { }

  ngOnInit() {}

}
=======
import { Component, input, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonIcon, IonLabel } from '@ionic/angular/standalone';

@Component({
  selector: 'app-empty-screen',
  templateUrl: './empty-screen.component.html',
  styleUrls: ['./empty-screen.component.scss'],
  standalone: true,
  imports: [IonGrid, IonRow, IonCol, IonIcon, IonLabel],
})
export class EmptyScreenComponent  implements OnInit {

  model = input<any>();

  constructor() { }

  ngOnInit() {}

}
>>>>>>> 6696688f7c9b5c348538fe38556b2ca217b986ae
