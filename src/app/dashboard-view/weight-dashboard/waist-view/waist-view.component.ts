import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DailyTrackersService } from 'src/app/core/services/daily-trackers.service';
import { DailyTrackerStoreService } from 'src/app/store/daily-tracker-store.service';

@Component({
  selector: 'app-waist-view',
  templateUrl: './waist-view.component.html',
  styleUrls: ['./waist-view.component.css'],
})
export class WaistViewComponent implements OnInit {
  resultRounded!: number;
  model2!: any;
  allWaistTracker!: any;
  lastSevenData!: [];
  waistModel!: any;
  editMode = false;
  indexOfUpdate!: number;

  constructor(
    private dailyTracker: DailyTrackerStoreService,
    private dailyService: DailyTrackersService
  ) {}

  ngOnInit(): void {
    this.dailyTracker.waist$.subscribe((waist) => {
      this.allWaistTracker = waist[0];
      this.filterDays();

      this.getAverage(waist[0]);
    });
  }

  onSubmit(form: NgForm) {
    let newEntry: any[] = [];
    let date = {
      year: form.value.d2.year,
      month: form.value.d2.month,
      day: form.value.d2.day,
    };
    let weight = form.value.weight;
    newEntry.push(date, weight);

    if (this.editMode) {
      this.allWaistTracker.data.splice(this.indexOfUpdate, 1, newEntry);

      this.dailyService.updateWaist(
        this.allWaistTracker,
        this.allWaistTracker.id
      );
      this.getAverage(this.allWaistTracker);
      this.editMode = false;
      form.reset();
      this.filterDays();
      return;
    }

    let firstChecker = this.allWaistTracker.data.find((element: any) => {
      return Number(element[0].day) === date.day - 1;
    });

    let secondChecker = this.allWaistTracker.data.find((element: any) => {
      return element[0] === date;
    });

    if (!firstChecker) {
      alert(
        `Please put in value for ${form.value.d2.day - 1}-${
          form.value.d2.month
        }-${form.value.d2.year}`
      );
    } else if (!secondChecker) {
      this.allWaistTracker.data.push(newEntry);
      this.dailyService.updateWaist(
        this.allWaistTracker,
        this.allWaistTracker.id
      );
      this.getAverage(this.allWaistTracker);
      this.filterDays;
      form.reset();
    } else {
      alert(`Data for ${date} had already been registered`);
    }
  }

  getAverage(waist: any) {
    let result = 0;
    waist.data.forEach((item: any) => {
      result = result + Number(item[1]);
    });

    this.resultRounded = Number(
      (Math.round((result / waist.data.length) * 100) / 100).toFixed(2)
    );
  }

  onUpdate(element: any, i: any) {
    this.waistModel = element[1];
    this.model2 = element[0];
    this.editMode = true;
    this.indexOfUpdate = i;
  }

  onDelete(element: any, i: any) {
    this.indexOfUpdate = i;
    this.allWaistTracker.data.splice(this.indexOfUpdate, 1);
    this.dailyService.updateWaist(
      this.allWaistTracker,
      this.allWaistTracker.id
    );
    this.getAverage(this.allWaistTracker);
    this.filterDays();
  }

  filterDays() {
    if (this.allWaistTracker.data.length > 7) {
      this.lastSevenData = this.allWaistTracker.data.slice(-7);
    } else {
      this.lastSevenData = this.allWaistTracker.data;
    }
  }
}
