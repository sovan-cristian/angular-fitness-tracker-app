import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
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
  userIndex!: number;
  wholeData!: any;

  togglerWaist = true
  datesWaist:string[] = [];
  waists: number[] = [];
  

  chartWaist: any;
  canvasWaist!:any;

  constructor(
    private dailyTracker: DailyTrackerStoreService,
    private dailyService: DailyTrackersService
  ) {}

  ngOnInit(): void {
    Chart.register(...registerables);
    this.dailyTracker.data$.subscribe((data) => {
      this.userIndex = data[0].id;
      this.wholeData = data;

      let test = data[0];
      this.allWaistTracker = test.data[0].waist[0];
      this.filterDays();

      this.lastSevenData?.forEach((res: any) => {
        this.datesWaist.push(`${res[0].year}-${res[0].month}-${res[0].day}`);
        this.waists.push(Number(res[1]));
      });

      let unit = `${this.allWaistTracker.unit}`

      this.canvasWaist = document.getElementById('canvas')
      this.chartWaist = new Chart(this.canvasWaist, {
        type: 'line',
        data: {
          labels: this.datesWaist,
          datasets: [{
            label: unit,
            data: this.waists,
            borderColor: '#3cba9f',
          }],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              display: true,
              position: 'bottom',
           },
          title: {
           display: false,
          }
         }
        },
      });

      this.getAverage(this.allWaistTracker);
    });
  }

  onSubmit(form: NgForm) {
    let newEntry: any[] = [];
    let date = {
      year: form.value.d2.year,
      month: form.value.d2.month,
      day: form.value.d2.day,
    };
    let waist = form.value.waist;
    newEntry.push(date, waist);

    if (this.editMode) {
      this.allWaistTracker.data.splice(this.indexOfUpdate, 1, newEntry);

      this.wholeData[0].data[0].waist[0] = this.allWaistTracker;
      this.dailyService.updateData(this.wholeData[0], this.userIndex);

      this.getAverage(this.allWaistTracker);
      this.editMode = false;
      form.reset();
      this.filterDays();
      this.chartDataUpdate();
      return;
    }

    let firstChecker = this.allWaistTracker.data.find((element: any) => {
      return Number(element[0].day) === date.day - 1;
    });

    let secondChecker = this.allWaistTracker.data.find((element: any) => {
      return (
        `${element[0].day}-${element[0].month}-${element[0].year}` ===
        `${date.day}-${date.month}-${date.year}`
      );
    });

    if (!firstChecker) {
      alert(
        `Please put in value for ${form.value.d2.day - 1}-${
          form.value.d2.month
        }-${form.value.d2.year}`
      );
      return;
    } else if (!secondChecker) {
      this.allWaistTracker.data.push(newEntry);
      this.wholeData[0].data[0].waist[0] = this.allWaistTracker;
      this.dailyService.updateData(this.wholeData[0], this.userIndex);

      this.getAverage(this.allWaistTracker);
      this.filterDays();
      form.reset();

      this.chartDataUpdate();
    } else {
      alert(
        `Data for ${date.day}-${date.month}-${date.year} had already been registered`
      );
      return;
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

  onDelete(i: any) {
    this.indexOfUpdate = i;
    this.allWaistTracker.data.splice(this.indexOfUpdate, 1);

    this.wholeData[0].data[0].waist[0] = this.allWaistTracker;
    this.dailyService.updateData(this.wholeData[0], this.userIndex);

    this.getAverage(this.allWaistTracker);
    this.filterDays();
    this.chartDataUpdate();
  }

  filterDays() {
    this.allWaistTracker.data.sort((a: any, b: any): any => {
      if (a[0].month === b[0].month) {
        return a[0].day - b[0].day;
      }
    });

    if (this.allWaistTracker.data.length > 7) {
      this.lastSevenData = this.allWaistTracker.data.slice(-7);
    } else {
      this.lastSevenData = this.allWaistTracker.data;
    }
  }

  toggleFunction(){
    if( this.togglerWaist == true){
      this.togglerWaist = false
      console.log(this.togglerWaist);
      
    }else{
      this.togglerWaist = true
      console.log(this.togglerWaist);
      
    }
  }

  chartDataUpdate(){
    this.datesWaist = []
    this.waists = []
    
    this.lastSevenData.forEach((res: any) => {
      this.datesWaist.push(`${res[0].year}-${res[0].month}-${res[0].day}`);
      this.waists.push(Number(res[1]));
    });

    this.chartWaist.data.datasets[0].data = this.waists
    this.chartWaist.data.labels = this.datesWaist

    this.chartWaist.update()
  }
}
