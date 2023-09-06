import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  
  firebaseConfig = {
    apiKey: "AIzaSyD-YiayNCko_ijuhIqaqhtQh9lUw37ESCc",
    authDomain: "riky-brasa-database.firebaseapp.com",
    projectId: "riky-brasa-database",
    storageBucket: "riky-brasa-database.appspot.com",
    messagingSenderId: "265206461496",
    appId: "1:265206461496:web:fc7470b01b7558a09322cd",
    measurementId: "G-6QQ59S0YQR"
  };
  
  app = initializeApp(this.firebaseConfig);
  analytics = getAnalytics(this.app);

  constructor() { }
}
