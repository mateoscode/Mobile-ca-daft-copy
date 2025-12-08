import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListData } from '../service/Propdata/propdata';


import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton } from '@ionic/angular/standalone';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  standalone: true,
  imports: [CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardSubtitle, IonCardContent, IonButtons, IonBackButton]
})
export class ListingPage implements OnInit {
  property: any;

  constructor(private route: ActivatedRoute, private listData: ListData) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const allData = await this.listData.getAllListData();
    this.property = id ? allData.find((p: any) => p.id === id) : null;
  }
}



