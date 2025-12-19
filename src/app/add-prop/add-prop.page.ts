import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonBackButton,
  IonButton,
} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ListData } from '../service/Propdata/propdata';
import { Identity } from '../service/identity/identity';
import { GeoPoint } from 'firebase/firestore';

declare const google: any;

@Component({
  selector: 'app-add-prop',
  templateUrl: 'add-prop.page.html',
  styleUrls: ['./add-prop.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButtons,
    IonBackButton,
    IonButton,
    CommonModule,
    FormsModule,
  ],
})
export class AddPropPage implements OnInit {
  error: string = '';
  user$ = this.identity.user$;

  constructor(
    private listData: ListData,
    private identity: Identity,
    private router: Router,
    private alertCtrl: AlertController,
  ) {}

  ngOnInit() {}

  async submitListing(
    title: string,
    price: string,
    bnb: string,
    description: string,
    image: string,
    eircode: string,
  ) {
    if (!this.identity.isLoggedIn()) {
      this.error = 'Please log in before creating a listing.';
      this.router.navigateByUrl('/login');
      return;
    }
    if (!title || !price || !bnb || !description || !image || !eircode) {
      this.error = 'All fields are required, including an image URL and Eircode.';
      return;
    }
    this.error = '';
    try {
      const trimmedEircode = eircode.trim().toUpperCase();
      const coords = await this.geocodeEircode(trimmedEircode);
      const geoPoint = new GeoPoint(coords.lat, coords.lng);
      const ownerEmail = this.identity.currentEmail();
      const docRef = await this.listData.addListing({
        ownerId: this.identity.currentUid(),
        ownerEmail: ownerEmail ?? 'Unknown seller',
        title,
        price,
        bnb,
        description,
        image,
        eircode: trimmedEircode,
        map: geoPoint,
      });
      console.log('Listing submitted:', docRef);
      await this.showConfirmation();
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (e) {
      this.error =
        typeof e === 'string'
          ? e
          : 'Failed to submit listing. Please verify your Eircode and try again.';
      console.error(e);
    }
  }

  private geocodeEircode(eircode: string): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      const target = eircode.trim();
      if (!target) {
        reject('Eircode is required.');
        return;
      }
      const mapsSdk = (window as any).google?.maps;
      if (!mapsSdk?.Geocoder) {
        reject('Google Maps SDK not loaded. Refresh and try again.');
        return;
      }
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address: `${target}, Ireland` }, (results: any, status: string) => {
        if (status === 'OK' && results?.[0]?.geometry?.location) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject('Unable to find coordinates for that Eircode.');
        }
      });
    });
  }

  private async showConfirmation() {
    const alert = await this.alertCtrl.create({
      header: 'Listing submitted',
      message: 'Your property is now live in the marketplace.',
      buttons: ['OK'],
    });
    await alert.present();
    await alert.onDidDismiss();
  }

  logout() {
    this.identity
      .logout()
      .then(() => this.router.navigateByUrl('/login', { replaceUrl: true }))
      .catch((err) => console.error('Failed to log out', err));
  }
}
