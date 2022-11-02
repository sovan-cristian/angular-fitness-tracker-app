import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HomepageComponent } from './homepage/homepage.component';
import { DashboardViewComponent } from './dashboard-view/dashboard-view.component';
import { LoginComponent } from './login/login.component';
import { WeightDashboardComponent } from './dashboard-view/weight-dashboard/weight-dashboard.component';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { firebase, firebaseui, FirebaseUIModule } from 'firebaseui-angular';
import {
  AngularFireAuthModule,
  USE_EMULATOR as USE_AUTH_EMULATOR,
} from '@angular/fire/compat/auth';
import { TrainingWatcherComponent } from './dashboard-view/training-watcher/training-watcher.component';
import { FormsModule } from '@angular/forms';
import { MainViewComponent } from './dashboard-view/main-view/main-view.component';
import { WaistViewComponent } from './dashboard-view/weight-dashboard/waist-view/waist-view.component';
import { WeightViewComponent } from './dashboard-view/weight-dashboard/weight-view/weight-view.component';
import { CalorieViewComponent } from './dashboard-view/weight-dashboard/calorie-view/calorie-view.component';
import { ChoiceViewComponent } from './dashboard-view/weight-dashboard/choice-view/choice-view.component';
import { ChestShouldersComponent } from './dashboard-view/training-watcher/chest-shoulders/chest-shoulders.component';
import { ExerciseChoiceComponent } from './dashboard-view/training-watcher/exercise-choice/exercise-choice.component';
import { BicepsTricepsComponent } from './dashboard-view/training-watcher/biceps-triceps/biceps-triceps.component';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'dashboard',
    component: DashboardViewComponent,
    children: [
      { path: '', redirectTo: 'main', pathMatch: 'full' },
      { path: 'main', component: MainViewComponent },
      {
        path: 'weight-watcher',
        component: WeightDashboardComponent,
        children: [
          { path: '', component: ChoiceViewComponent },
          { path: 'weight', component: WeightViewComponent },
          { path: 'calories', component: CalorieViewComponent },
          { path: 'waist', component: WaistViewComponent },
        ],
      },
      {
        path: 'training-watcher',
        component: TrainingWatcherComponent,
        children: [
          { path: '', component: ExerciseChoiceComponent },
          { path: 'chest-shoulders', component: ChestShouldersComponent },
          { path: 'biceps-triceps', component: BicepsTricepsComponent },
        ],
      },
    ],
  },
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
    MainViewComponent,
    WaistViewComponent,
    WeightViewComponent,
    ChoiceViewComponent,
    CalorieViewComponent,
    ChestShouldersComponent,
    ExerciseChoiceComponent,
    BicepsTricepsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    FirebaseUIModule.forRoot(firebaseUiAuthConfig),
    FormsModule,
    HttpClientModule,
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
