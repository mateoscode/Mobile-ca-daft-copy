import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListData } from '../service/Propdata/propdata';

import {
  IonCard,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButtons,
  IonBackButton,
  IonButton,
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  standalone: true,
  imports: [
    CommonModule,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonCard,
    IonButtons,
    IonBackButton,
    IonButton,
  ],
})
export class ListingPage implements OnInit {
  property: any;

  constructor(
    private route: ActivatedRoute,
    private listData: ListData,
    private alertCtrl: AlertController,
  ) {}

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const allData = await this.listData.getAllListData();
    this.property = id ? allData.find((p: any) => p.id === id) : null;
  }

  async requestViewing() {
    if (!this.property?.id) {
      return;
    }
    const alert = await this.alertCtrl.create({
      header: 'Request a viewing',
      message: 'Enter your email and we will connect you with the host.',
      inputs: [
        {
          name: 'email',
          type: 'email',
          placeholder: 'you@example.com',
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
        },
        {
          text: 'Send request',
          handler: async (data) => {
            const email = (data?.email ?? '').trim();
            if (!email) {
              return false;
            }
            try {
              await this.listData.addViewingRequest(this.property.id, email);
              await this.showViewingConfirmation();
              return true;
            } catch (err) {
              console.error('Viewing request failed', err);
              return false;
            }
          },
        },
      ],
    });
    await alert.present();
  }

  private async showViewingConfirmation() {
    const alert = await this.alertCtrl.create({
      header: 'Request sent',
      message: 'The seller will reach out to schedule your viewing.',
      buttons: ['OK'],
    });
    await alert.present();
  }
}
