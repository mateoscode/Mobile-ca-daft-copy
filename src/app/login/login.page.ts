import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/angular/standalone';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { Identity } from '../service/identity/identity';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, MatButtonModule, RouterModule, IonButton, IonButtons]
})
export class LoginPage implements OnInit {
  constructor(private identity: Identity) { }
  error: string = '';

  ngOnInit() {
  }
  // calls the login method from the identity service
  login(email: string, pass: string) {
    this.identity.login(email, pass);
  }
}
