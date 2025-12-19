import { Injectable } from '@angular/core';
import { initializeApp, getApps } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  User,
} from 'firebase/auth';
import { doc, getFirestore, setDoc } from 'firebase/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Identity {
  private firebaseConfig = {
    // Firebase configuration
    apiKey: 'AIzaSyBzZ18MjRlCNecOMnRKCnnEt01spZUA118',
    authDomain: 'camobile-c4164.firebaseapp.com',
    projectId: 'camobile-c4164',
    storageBucket: 'camobile-c4164.firebasestorage.app',
    messagingSenderId: '722921922598',
    appId: '1:722921922598:web:104cb7698d0a90e26286e7',
    measurementId: 'G-M3V606CXR6',
  };
  private app: any;
  private auth: any;
  private db: any;
  private userSubject = new BehaviorSubject<User | null>(null);
  readonly user$ = this.userSubject.asObservable();

  constructor() {
    if (!getApps().length) {
      this.app = initializeApp(this.firebaseConfig);
    } else {
      this.app = getApps()[0];
    }
    this.auth = getAuth(this.app);
    this.db = getFirestore(this.app);
    onAuthStateChanged(this.auth, (user) => this.userSubject.next(user));
  }

  test() {
    console.log('Identity service is working!');
  }

  login(email: string, password: string) {
    // login method using Firebase Authentication
    return signInWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        const profileRef = doc(this.db, 'Users', user.uid);
        await setDoc(
          profileRef,
          { email: user.email ?? email },
          { merge: true },
        );
        console.log('Login successful:', user);
        return user;
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login failed:', errorCode, errorMessage);
        throw error;
      });
  }

  register(email: string, password: string) {
    // register using Firebase
    return createUserWithEmailAndPassword(this.auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log('Registration successful:', user);
        const profileRef = doc(this.db, 'Users', user.uid);
        await setDoc(
          profileRef,
          { email: user.email ?? email },
          { merge: true },
        );
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

  currentEmail(): string | null {
    return this.userSubject.value?.email ?? null;
  }

  logout() {
    return signOut(this.auth);
  }
}
