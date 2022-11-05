import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { ExercisesService } from '../core/services/exercises.service';

@Injectable({
  providedIn: 'root',
})
export class FitnessDataStoreService {
  exercises$: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  addTraining$ = new Subject<any>();

  constructor(private trainingService: ExercisesService) {
    this.trainingService.getBiandTri().subscribe((exercises) => {
      this.exercises$.next(exercises);
    });
  }
}
