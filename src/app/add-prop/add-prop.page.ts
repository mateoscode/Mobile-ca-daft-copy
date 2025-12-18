import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButtons, IonBackButton, IonButton } from '@ionic/angular/standalone';
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

  constructor(private listData: ListData, private identity: Identity, private router: Router) { }

  ngOnInit() {}

  async submitListing(title: string, price: string, bnb: string, description: string) {
    if (!this.identity.isLoggedIn()) {
      this.error = 'Please log in before creating a listing.';
      this.router.navigateByUrl('/login');
      return;
    }
    if (!title || !price || !bnb || !description) {
      this.error = 'All fields are required.';
      return;
    }
    this.error = '';
    try {
      const docRef = await this.listData.addListing({
        ownerId: this.identity.currentUid(),
        title,
        price,
        bnb,
        description
      });
      console.log('Listing submitted:', docRef);
    } catch (e) {
      this.error = 'Failed to submit listing.';
      console.error(e);
    }
  }

}
