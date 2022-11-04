import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { DailyTrackersService } from '../core/services/daily-trackers.service';
import { ExercisesService } from '../core/services/exercises.service';

@Injectable({
  providedIn: 'root',
})
export class DailyTrackerStoreService {
  weight$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  waist$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  calories$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  addWeight$ = new Subject<any>();

  constructor(private dailyService: DailyTrackersService) {
    this.dailyService.getWeight().subscribe((weight) => {
      this.weight$.next(weight);
    });

    this.dailyService.getWaist().subscribe((waist) => {
      this.waist$.next(waist);
    });

    this.dailyService.getCalories().subscribe((calories) => {
      this.calories$.next(calories);
    });
  }
}
