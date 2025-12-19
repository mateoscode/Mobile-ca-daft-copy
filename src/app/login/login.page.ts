import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonButton, IonButtons } from '@ionic/angular/standalone';
import { Router, RouterModule } from '@angular/router';
import { Identity } from '../service/identity/identity';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule, RouterModule, IonButton, IonButtons]
})
export class LoginPage implements OnInit {
  constructor(private identity: Identity, private router: Router) { }
  error: string = '';

  ngOnInit() {
  }
  // calls the login method from the identity service
  async login(email: string, pass: string) {
    if (!email || !pass) {
      this.error = 'Enter both email and password.';
      return;
    }
    this.error = '';
    try {
      await this.identity.login(email, pass);
      this.router.navigateByUrl('/home', { replaceUrl: true });
    } catch (err: any) {
      const message = err?.code === 'auth/invalid-credential' ? 'Invalid email or password.' : 'Unable to sign in. Please try again.';
      this.error = message;
    }
  }
}
