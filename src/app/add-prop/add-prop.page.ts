import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ListData } from '../service/Propdata/propdata';
import { Identity } from '../service/identity/identity';

@Component({
  selector: 'app-add-prop',
  templateUrl: 'add-prop.page.html',
  styleUrls: ['./add-prop.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton, CommonModule, FormsModule]
})
export class AddPropPage implements OnInit {

  error: string = '';
  user$ = this.identity.user$;

  constructor(
    private listData: ListData,
    private identity: Identity,
    private router: Router,
    private alertCtrl: AlertController
  ) { }

  ngOnInit() {}

  async submitListing(title: string, price: string, bnb: string, description: string, image: string) {
    if (!this.identity.isLoggedIn()) {
      this.error = 'Please log in before creating a listing.';
      this.router.navigateByUrl('/login');
      return;
    }
    if (!title || !price || !bnb || !description || !image) {
      this.error = 'All fields are required. Include an image URL.';
      return;
    }
    this.error = '';
    try {
      const ownerEmail = this.identity.currentEmail();
      const docRef = await this.listData.addListing({
        ownerId: this.identity.currentUid(),
        ownerEmail: ownerEmail ?? 'Unknown seller',
        title,
        price,
        bnb,
        description,
        image
      });
      console.log('Listing submitted:', docRef);
      await this.showConfirmation();
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (e) {
      this.error = 'Failed to submit listing.';
      console.error(e);
    }
  }

  private async showConfirmation() {
    const alert = await this.alertCtrl.create({
      header: 'Listing submitted',
      message: 'Your property is now live in the marketplace.',
      buttons: ['OK']
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  logout() {
    this.identity.logout()
      .then(() => this.router.navigateByUrl('/login', { replaceUrl: true }))
      .catch((err) => console.error('Failed to log out', err));
  }
}
