import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, addDoc } from 'firebase/firestore';


@Injectable({
  providedIn: 'root',
})
export class ListData { //data for property listings
  data: any = [];
  private firebaseConfig = { // Firebase configuration
    apiKey: "AIzaSyBzZ18MjRlCNecOMnRKCnnEt01spZUA118",
    authDomain: "camobile-c4164.firebaseapp.com",
    projectId: "camobile-c4164",
    storageBucket: "camobile-c4164.firebasestorage.app",
    messagingSenderId: "722921922598",
    appId: "1:722921922598:web:104cb7698d0a90e26286e7",
    measurementId: "G-M3V606CXR6"

  };
  private app: any;
  private db: any;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
  }



  async getAllListData() {
    this.data = [];
    const querySnapshot = await getDocs(collection(this.db, "PropertyData"));

    querySnapshot.forEach(doc => {
      this.data.push({
        id: doc.id,
        ...doc.data()
      });
    });
    console.log('Fetched Firestore data:', this.data);
    return this.data;
  }

  getListDataById(id: string) {
    return this.data.find((p: any) => p.id === id);
  }

  async addListing(listing: any) {
    // Add a new document to the PropertyData collection
    const docRef = await addDoc(collection(this.db, 'PropertyData'), listing);
    return docRef;
  }

}

