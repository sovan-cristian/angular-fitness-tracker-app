import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { ExercisesService } from 'src/app/core/services/exercises.service';
import { FitnessDataStoreService } from 'src/app/store/fitness-data-store.service';

@Component({
  selector: 'app-chest-shoulders',
  templateUrl: './chest-shoulders.component.html',
  styleUrls: ['./chest-shoulders.component.css'],
})
export class ChestShouldersComponent implements OnInit, OnChanges {
  model!: NgbDateStruct;
  today = this.calendar.getToday();

  public isCollapsed = true;

  chestandShoulder!: any;

  constructor(
    private calendar: NgbCalendar,
    private trainingStore: FitnessDataStoreService
  ) {}

  ngOnInit(): void {
    this.trainingStore.exercises$.subscribe((exercises) => {
      this.chestandShoulder = exercises;
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    // this.trainingStore.exercises$.next()
  }

  toggle() {
    if (this.isCollapsed === true) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
  }
}
