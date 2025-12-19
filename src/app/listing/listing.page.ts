import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListData } from '../service/Propdata/propdata';
import {IonCard, IonHeader, IonToolbar, IonTitle, IonContent,
IonButtons, IonBackButton, IonButton, IonSpinner,} from '@ionic/angular/standalone';
import { AlertController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { GoogleMapsModule } from '@angular/google-maps';

declare const google: any;

@Component({
  selector: 'app-listing',
  templateUrl: './listing.page.html',
  styleUrls: ['./listing.page.scss'],
  standalone: true,
  imports: [
    CommonModule, IonHeader, IonToolbar, IonTitle, IonContent, IonCard,
    IonButtons, IonBackButton, IonButton, IonSpinner, GoogleMapsModule,
  ],
})
export class ListingPage implements OnInit {
  property: any;
  mapCenter = { lat: 37.7749, lng: -122.4194 };
  markerPosition = { lat: 37.7749, lng: -122.4194 };
  mapLoaded = false;
  mapError: string | null = null;
  zoom = 14;

  constructor(
    private route: ActivatedRoute,
    private listData: ListData,
    private alertCtrl: AlertController,
  ) { }

  async ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    const allData = await this.listData.getAllListData();
    this.property = id ? allData.find((p: any) => p.id === id) : null;
    if (this.property) {
      await this.setMapLocation();
    }
  }

  private async setMapLocation() {
    this.mapLoaded = false;
    this.mapError = null;
    const hasCoords =
      typeof this.property?.lat === 'number' &&
      typeof this.property?.lng === 'number';

    if (hasCoords) {
      this.applyMapCoordinates({
        lat: Number(this.property.lat),
        lng: Number(this.property.lng),
      });
      return;
    }

    const geoPoint = this.property?.map;
    if (
      geoPoint &&
      typeof geoPoint.latitude === 'number' &&
      typeof geoPoint.longitude === 'number'
    ) {
      this.applyMapCoordinates({
        lat: geoPoint.latitude,
        lng: geoPoint.longitude,
      });
      return;
    }

    const address = this.property?.address;
    if (!address) {
      this.mapError = 'Address not provided; showing default location';
      this.mapLoaded = true;
      return;
    }

    try {
      const coords = await this.geocodeAddress(address);
      this.applyMapCoordinates(coords);
    } catch (error) {
      console.error('Geocoding failed', error);
      this.mapError = 'Unable to locate this address';
      this.mapLoaded = true;
    }
  }

  private applyMapCoordinates(coords: { lat: number; lng: number }) {
    this.mapCenter = coords;
    this.markerPosition = coords;
    this.mapLoaded = true;
  }

  private geocodeAddress(address: string): Promise<{ lat: number; lng: number }> {
    return new Promise((resolve, reject) => {
      if (!(window as any).google?.maps) {
        reject('Google Maps SDK not loaded');
        return;
      }
      const geocoder = new google.maps.Geocoder();
      geocoder.geocode({ address }, (results: any, status: string) => {
        if (status === 'OK' && results?.[0]?.geometry?.location) {
          const location = results[0].geometry.location;
          resolve({ lat: location.lat(), lng: location.lng() });
        } else {
          reject(status);
        }
      });
    });
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
