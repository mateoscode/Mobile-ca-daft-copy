import { Injectable } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, User } from 'firebase/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Identity {
  private firebaseConfig = { // Firebase configuration
    apiKey: "AIzaSyBzZ18MjRlCNecOMnRKCnnEt01spZUA118",

    projectId: "camobile-c4164"
  };
  private app: any;
  private auth: any;
  private userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();

  constructor() { 
    if (!getApps().length) {
      this.app = initializeApp(this.firebaseConfig);
    } else {
      this.app = getApps()[0];
    }
    this.auth = getAuth(this.app);
    onAuthStateChanged(this.auth, (user) => this.userSubject.next(user));
  }

  
  test(){
    console.log('Identity service is working!');
  }

  login(email: string, password: string){ // login method using Firebase Authentication
    return signInWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        // Signed in 
        debugger
        const user = userCredential.user;
        console.log('Login successful:', user);
      })
      .catch((error) => {
        debugger
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login failed:', errorCode, errorMessage);
      });
  }

  register(email: string, password: string){  // register using Firebase 
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log('Registration successful:', user);
        return user;
      })
      .catch((error) => {
        console.error('Registration failed:', error.code, error.message);
        throw error;
      });
  }

  isLoggedIn(): boolean {
    return !!this.userSubject.value;
  }

  currentUid(): string | null {
    return this.userSubject.value?.uid ?? null;
  }
  
}

