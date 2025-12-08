import { Injectable } from '@angular/core';
import { initializeApp, getApps } from "firebase/app"; 
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword } from "firebase/auth";

@Injectable({
  providedIn: 'root',
})
export class Identity {
  private firebaseConfig = { // Firebase configuration
    apiKey: "AIzaSyBzZ18MjRlCNecOMnRKCnnEt01spZUA118",

    projectId: "camobile-c4164"
  };
  private app: any;

  constructor() { 
    if (!getApps().length) {
      this.app = initializeApp(this.firebaseConfig);
    } else {
      this.app = getApps()[0];
    }
  }

  
  test(){
    console.log('Identity service is working!');
  }

  login(email: string, password: string){ // login method using Firebase Authentication
    const auth = getAuth(this.app);
    signInWithEmailAndPassword(auth, email, password)
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
    const auth = getAuth(this.app);
    return createUserWithEmailAndPassword(auth, email, password)
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
  
}

