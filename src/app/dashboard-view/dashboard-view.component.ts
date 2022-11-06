import {
  Component,
  HostListener,
  OnDestroy,
  OnInit,
  TemplateRef,
} from '@angular/core';
import { NgbOffcanvas } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subscription } from 'rxjs';
import { User } from '../core/interfaces/user.interface';
import { AuthService } from '../core/services/auth.service';
import { DailyTrackerStoreService } from '../store/daily-tracker-store.service';
import { DailyTrackersService } from 'src/app/core/services/daily-trackers.service';

@Component({
  selector: 'app-dashboard-view',
  templateUrl: './dashboard-view.component.html',
  styleUrls: ['./dashboard-view.component.css'],
})
export class DashboardViewComponent implements OnInit, OnDestroy {
  @HostListener('window:resize')
  onResize() {
    this.currentWindowWidth = window.innerWidth;
  }

  closeResult!: string;
  public currentWindowWidth!: number;

  user: User | null = null;
  subscriptions: Subscription = new Subscription();
  user$: Observable<User> = this.authService.user$.asObservable();
  constructor(
    private offcanvasService: NgbOffcanvas,
    private authService: AuthService,
    private existingChecker: DailyTrackersService
  ) {
    this.subscriptions.add(
      this.user$.subscribe((user: User) => {
        this.user = user;

        this.existingChecker.getData(this.user.uid).subscribe((data: any) => {
          console.log(data);
          let test = data;

          if (test) {
            console.log('te rog eu');
            console.log(data.length);

            if (test.length == 0) {
              let userTemplate = {
                firebaseID: this.user?.uid,
                name: this.user?.name,
                data: [
                  {
                    ChestAndShoulder: [
                      {
                        id: 1,
                        date: {
                          day: '4',
                          month: '12',
                          year: '2022',
                        },
                        sets: [
                          {
                            name: 'Bench press',
                            firstSet: '20 / 12',
                            secondSet: '500 / 500',
                            thirdSet: '10 / 10',
                          },
                          {
                            name: 'Inclined press',
                            firstSet: '12 / 12',
                            secondSet: '14 / 12',
                            thirdSet: '16 / 12',
                          },
                          {
                            name: 'Bench DB press',
                            firstSet: '8 / 12',
                            secondSet: '10 / 12',
                            thirdSet: '12 / 12',
                          },
                          {
                            name: 'Fluturari umeri',
                            firstSet: '6 / 12',
                            secondSet: '8 / 12',
                            thirdSet: '10 / 12',
                          },
                          {
                            name: 'Front disc raise',
                            firstSet: '25 / 12',
                            secondSet: '25 / 12',
                            thirdSet: '25 / 12',
                          },
                        ],
                      },
                    ],
                    BicepsAndTriceps: [
                      {
                        id: 1,
                        date: {
                          day: '3',
                          month: '12',
                          year: '2022',
                        },
                        sets: [
                          {
                            name: 'Biceps bar curl',
                            firstSet: '20 / 12',
                            secondSet: '25 / 12',
                            thirdSet: '28 / 12',
                          },
                          {
                            name: 'Biceps DB curl',
                            firstSet: '12 / 12',
                            secondSet: '14 / 12',
                            thirdSet: '16 / 12',
                          },
                          {
                            name: '1 DB raise',
                            firstSet: '8 / 12',
                            secondSet: '10 / 12',
                            thirdSet: '12 / 12',
                          },
                          {
                            name: 'Bench DB kickback',
                            firstSet: '6 / 12',
                            secondSet: '8 / 12',
                            thirdSet: '10 / 12',
                          },
                          {
                            name: 'Skull crusher',
                            firstSet: '25 / 12',
                            secondSet: '25 / 12',
                            thirdSet: '25 / 12',
                          },
                          {
                            name: 'Wrist flexion',
                            firstSet: '25 / 12',
                            secondSet: '25 / 12',
                            thirdSet: '25 / 12',
                          },
                        ],
                      },
                    ],
                    weight: [
                      {
                        id: '1',
                        name: 'Weight Tracker',
                        unit: 'Weight (kg)',
                        data: [
                          [
                            {
                              year: '2022',
                              month: '11',
                              day: '7',
                            },
                            '88',
                          ],
                        ],
                      },
                    ],
                    calories: [
                      {
                        id: '1',
                        name: 'Calorie Tracker',
                        unit: 'Calories',
                        data: [
                          [
                            {
                              year: '2022',
                              month: '11',
                              day: '7',
                            },
                          ],
                          '2000',
                        ],
                      },
                    ],
                    waist: [
                      {
                        id: '1',
                        name: 'Waist Tracker',
                        unit: 'Waist Size (cm)',
                        data: [
                          [
                            {
                              year: '2022',
                              month: '11',
                              day: '7',
                            },
                          ],
                        ],
                      },
                    ],
                  },
                ],
              };
              this.existingChecker.createUser(userTemplate);
              return;
            } else {
              console.log('not success');
            }
          }
        });
      })
    );
  }

  ngOnInit(): void {
    this.currentWindowWidth = window.innerWidth;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  onLogout() {
    this.authService.logout();
  }
}
