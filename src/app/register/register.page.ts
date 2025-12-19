import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonButtons,
} from '@ionic/angular/standalone';
import { Identity } from '../service/identity/identity';
import { AlertController } from '@ionic/angular';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonButtons,
    IonButton,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class RegisterPage implements OnInit {
  error: string = '';
  constructor(
    private identity: Identity,
    private alertCtrl: AlertController,
    private router: Router,
  ) {}

  ngOnInit() {}

  async register(email: string, pass: string) {
    this.error = '';
    if (!email || !pass) {
      // validation for empty fields
      this.error = 'Please enter email and password.';
      return;
    }
    try {
      await this.identity.register(email, pass); // calls register from the identity
      const alert = await this.alertCtrl.create({
        header: 'Registered',
        message: 'Your account has been created successfully.',
        buttons: [
          {
            text: 'OK',
            handler: () => {
              this.router.navigate(['/home']);
            },
          },
        ],
      });
      await alert.present();
    } catch (err: any) {
      // catches and displays registration errors
      console.error('Register error', err);
      this.error = err?.message || 'Registration failed.';
    }
  }
}
