import { Injectable } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { collection, getDocs, addDoc, doc, getDoc } from 'firebase/firestore';


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
  private ownerEmailCache = new Map<string, string>();

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
    this.db = getFirestore(this.app);
  }



  async getAllListData() {
    this.data = [];
    const querySnapshot = await getDocs(collection(this.db, "PropertyData"));

    for (const docSnapshot of querySnapshot.docs) {
      const listing: any = {
        id: docSnapshot.id,
        ...docSnapshot.data()
      };
      if (!listing.ownerEmail && listing.ownerId) {
        listing.ownerEmail = await this.resolveOwnerEmail(listing.ownerId);
      }
      this.data.push(listing);
    }
    console.log('Fetched Firestore data:', this.data);
    return this.data;
  }

  getListDataById(id: string) {
    return this.data.find((p: any) => p.id === id);
  }

  async addListing(listing: any) {
    if (listing.ownerId && !listing.ownerEmail) {
      listing.ownerEmail = await this.resolveOwnerEmail(listing.ownerId);
    }
    const docRef = await addDoc(collection(this.db, 'PropertyData'), listing);
    return docRef;
  }

  async addViewingRequest(listingId: string, email: string) {
    await addDoc(collection(this.db, 'ViewingRequests'), {
      listingId,
      email,
      createdAt: new Date().toISOString()
    });
  }

  private async resolveOwnerEmail(ownerId: string | undefined) {
    if (!ownerId) {
      return 'Unknown seller';
    }
    if (this.ownerEmailCache.has(ownerId)) {
      return this.ownerEmailCache.get(ownerId);
    }
    try {
      const profileRef = doc(this.db, 'Users', ownerId);
      const profileSnap = await getDoc(profileRef);
      const email = profileSnap.exists() ? (profileSnap.data() as Record<string, any>)['email'] : 'Unknown seller';
      this.ownerEmailCache.set(ownerId, email);
      return email;
    } catch (err) {
      console.error('Could not resolve owner email for', ownerId, err);
      return 'Unknown seller';
    }
  }

}

