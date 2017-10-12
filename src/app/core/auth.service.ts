import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import {AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import * as firebase from 'firebase/app';

@Injectable()
export class AuthService {

  authState: any = null;
  uid;
  
   constructor(private afAuth: AngularFireAuth, 
               private router: Router,
               private db: AngularFireDatabase) {
     this.afAuth.authState.subscribe((auth) => {
       this.authState = auth
       this.uid = this.authState.uid
     });
   }
  
   get currentUserId(): string {
     return (this.authState !== null) ? this.authState.uid : ''
   }
  
   get currentUserName(): string {
     return this.authState['email']
   }
  
   get currentUser(): any {
     return (this.authState !== null) ? this.authState : null;
   }
  
   get isUserEmailLoggedIn(): boolean {
     if ((this.authState !== null)) {
       return true
     } else {
       return false
     }
   }
 
   private updateUserData(): void {
     // Writes user name and email to realtime db
     // useful if your app displays information about users or for admin features
   
       let path = `users/${this.currentUserId}`; // Endpoint on firebase
       let data = {
                     email: this.authState.email,
                     name: this.authState.displayName
                   }
   
       this.db.object(path).update(data)
       .catch(error => console.log(error));
   
     }
  
   signUpWithEmail(email: string, password: string) {
     return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user
         this.updateUserData()
       })
       .catch(error => {
         console.log(error)
         throw error
       });
   }
 
   googleLogin() {
     const provider = new firebase.auth.GoogleAuthProvider()
     return this.socialSignIn(provider);
   }
 
   private socialSignIn(provider) {
     return this.afAuth.auth.signInWithPopup(provider)
       .then((credential) =>  {
           this.authState = credential.user
           this.updateUserData()
       })
       .catch(error => console.log(error));
   }
 
  
   loginWithEmail(email: string, password: string) {
     return this.afAuth.auth.signInWithEmailAndPassword(email, password)
       .then((user) => {
         this.authState = user
       })
       .catch(error => {
         console.log(error)
         throw error
       });
   }
  
   signOut(): void {
     this.afAuth.auth.signOut().then(() => {
       this.router.navigate(['/'])
     });
   }

}
