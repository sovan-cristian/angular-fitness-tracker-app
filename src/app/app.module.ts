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

const appRoutes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardViewComponent },
];

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    DashboardViewComponent,
    LoginComponent,
    WeightDashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    RouterModule.forRoot(appRoutes),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
