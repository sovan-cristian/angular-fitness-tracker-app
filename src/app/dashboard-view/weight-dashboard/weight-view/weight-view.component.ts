import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { DailyTrackersService } from 'src/app/core/services/daily-trackers.service';
import { DailyTrackerStoreService } from 'src/app/store/daily-tracker-store.service';

@Component({
  selector: 'app-weight-view',
  templateUrl: './weight-view.component.html',
  styleUrls: ['./weight-view.component.css'],
})
export class WeightViewComponent implements OnInit, OnChanges {
  resultRounded!: number;
  model2!: string;
  allWeightTracker!: any;
  lastSevenData!: [];

  constructor(
    private dailyTracker: DailyTrackerStoreService,
    private dailyService: DailyTrackersService
  ) {}

  ngOnInit(): void {
    this.dailyTracker.weight$.subscribe((weights) => {
      this.allWeightTracker = weights[0];
      this.lastSevenData = this.allWeightTracker.data.slice(-7);

      this.getAverage(weights[0]);
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
  }

  onSubmit(form: NgForm) {
    let newEntry: any[] = [];
    let date = `${form.value.d2.day}-${form.value.d2.month}-${form.value.d2.year}`;
    let weight = form.value.weight;
    newEntry.push(date, weight);

    let checker = this.allWeightTracker.data.find((element: any) => {
      return element[0] === date;
    });

    if (!checker) {
      this.allWeightTracker.data.push(newEntry);
      this.dailyService.updateWeight(
        this.allWeightTracker,
        this.allWeightTracker.id
      );
      this.getAverage(this.allWeightTracker);
    }
  }

  getAverage(weights: any) {
    let result = 0;
    weights.data.forEach((item: any) => {
      result = result + Number(item[1]);
    });

    this.resultRounded = Number(
      (Math.round((result / weights.data.length) * 100) / 100).toFixed(2)
    );
  }
}
