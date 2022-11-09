import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';
import { DailyTrackersService } from '../core/services/daily-trackers.service';


@Injectable({
  providedIn: 'root',
})
export class DailyTrackerStoreService {
  weight$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  waist$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  data$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  addWeight$ = new Subject<any>();

  user: User | null = null;
  subscriptions: Subscription = new Subscription();
  user$: Observable<User> = this.authService.user$.asObservable();

  constructor(
    private dailyService: DailyTrackersService,
    private authService: AuthService
  ) {
    this.subscriptions.add(
      this.user$.subscribe((user: User) => {
        this.user = user;

        if (this.user) {
          this.dailyService.getData(this.user?.uid).subscribe((data) => {
            this.data$.next(data);
          });
        }
      })
    );
  }
}
