import { Component, OnDestroy, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import {
  FirebaseUISignInFailure,
  FirebaseUISignInSuccessWithAuthResult,
} from 'firebaseui-angular';
import { Observable, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserResponse } from '../core/interfaces/user-response.interface';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  isLoggedIn$: Observable<boolean> = this.authService.user$
    .asObservable()
    .pipe(map((user) => !!user));

  user$: Observable<User> = this.authService.user$.asObservable();
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}

  successCallback(data: FirebaseUISignInSuccessWithAuthResult): void {
    this.authService.onUserSignIn(data.authResult.user as UserResponse);
    this.router.navigate(['/dashboard']);
  }

  errorCallback(error: FirebaseUISignInFailure): void {}
}
