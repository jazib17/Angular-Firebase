import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider, GithubAuthProvider, FacebookAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private fireauth: AngularFireAuth, private router: Router) { }

  // login method
  login(email: string, password: string) {
    this.fireauth.signInWithEmailAndPassword(email, password).then(res => {
      localStorage.setItem('token', 'true');

      if (res.user?.emailVerified == true) {
        this.router.navigate(['/dashboard']);
      } else {
        this.router.navigate(['/verify-email'])
      }
    }, err => {
      this.router.navigate(['/login']);
    })
  }

  // register method
  register(email: string, password: string) {
    this.fireauth.createUserWithEmailAndPassword(email, password).then(res => {
      alert('Registration successful');
      this.router.navigate(['/login']);
      this.sendEmailForVerification(res.user);
    }, err => {
      alert(err.message);
      this.router.navigate(['/register'])
    })
  }

  // logout method
  logout() {
    this.fireauth.signOut().then(res => {
      localStorage.removeItem('token');
      this.router.navigate(['/login']);
    }, err => {
      alert(err.message);
    })
  }

  // forgot password method
  forgotPassword(email: string) {
    this.fireauth.sendPasswordResetEmail(email).then(res => {
      this.router.navigate(['/verify-email']);
    }, err => {
      alert('Something went wrong.')
    })
  }

  // email verification
  sendEmailForVerification(user: any) {
    this.fireauth.currentUser.then(u => u?.sendEmailVerification()).then(res => {
      this.router.navigate(['/verify-email']);
    }, err => {
        alert('Something went wrong. Not able to send mail to registered email.');
    })
  }

  // sign in with google
  googleSignIn() {
    this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res => {
      this.router.navigate(['/dashboard']);
      localStorage.setItem('token', JSON.stringify(res.user?.uid));
    }, err => {
      alert(err.message);
    })
  }

}
