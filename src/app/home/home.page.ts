import { Component, OnInit } from '@angular/core';
import {
  IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton,
} from '@ionic/angular/standalone';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { PropertyCardComponent } from '../property-card/property-card.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { ListData } from '../service/Propdata/propdata';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, CommonModule,
     PropertyCardComponent, MatButtonModule, RouterModule, ],
})
export class HomePage implements OnInit {
  data: any = [];
  constructor(private ListData: ListData) { }

  async ngOnInit() {
    this.data = await this.ListData.getAllListData();
    console.log('Homepage Firestore data:', this.data);
  }
}
