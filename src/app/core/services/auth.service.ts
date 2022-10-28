import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserResponse } from '../interfaces/user-response.interface';
import { User } from '../interfaces/user.interface';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

const ADMIN_UID = 'qECXLybWEZUhNBdt50cWK722Nam1';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user$ = new BehaviorSubject<User | any>(null);
  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router
  ) {
    this.angularFireAuth.authState.subscribe((user) => {
      return user && this.onUserSignIn(user);
    });
  }

  onUserSignIn(user: UserResponse): void {
    this.user$.next({
      email: user.email,
      name: user.displayName,
      picture: user.photoURL,
      uid: user.uid,
      isAdmin: user.uid === ADMIN_UID,
    });
  }

  logout() {
    this.angularFireAuth.signOut();
    this.user$.next(null);
    this.router.navigate(['/']);
  }
}
