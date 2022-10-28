import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { LoginComponent } from './login/login.component';
import { WeightDashboardComponent } from './weight-dashboard/weight-dashboard.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/compat/auth';
import { TrainingWatcherComponent } from './dashboard-view/training-watcher/training-watcher.component';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardViewComponent },
];

const firebaseUiAuthConfig: firebaseui.auth.Config = {
  signInFlow: 'popup',
  signInOptions: [
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
    {
      requireDisplayName: false,
      provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
    },
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.GOOGLE_YOLO,
};

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardViewComponent,
    LoginComponent,
    WeightDashboardComponent,
    TrainingWatcherComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
  ],
  providers: [
    // {
    //   provide: USE_AUTH_EMULATOR,
    //   useValue: !environment.production ? ['localhost', 9099] : undefined,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
