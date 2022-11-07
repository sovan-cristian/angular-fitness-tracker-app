import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { DailyTrackersService } from 'src/app/core/services/daily-trackers.service';
import { DailyTrackerStoreService } from 'src/app/store/daily-tracker-store.service';

@Component({
  selector: 'app-weight-view',
  templateUrl: './weight-view.component.html',
  styleUrls: ['./weight-view.component.css'],
})
export class WeightViewComponent implements OnInit {

  resultRounded!: number;
  model2!: any;
  allWeightTracker!: any;
  lastSevenData!: [];
  weightModel!: any;
  editMode = false;
  indexOfUpdate!: number;
  userIndex!: number;
  wholeData!: any;
  toggler = true;

  dates:string[] = [];
  weights: number[] = [];
  

  chart: any;
  canvas!:any;

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
      this.allWeightTracker = test.data[0].weight[0];
      this.filterDays();
      
      
      this.lastSevenData?.forEach((res: any) => {
        this.dates.push(`${res[0].year}-${res[0].month}-${res[0].day}`);
        this.weights.push(Number(res[1]));
      });

      let unit = `${this.allWeightTracker.unit}`

      this.canvas = document.getElementById('canvas')
      this.chart = new Chart(this.canvas, {
        type: 'line',
        data: {
          labels: this.dates,
          datasets: [{
            label: unit,
            data: this.weights,
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

      this.getAverage(this.allWeightTracker);
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
      this.allWeightTracker.data.splice(this.indexOfUpdate, 1, newEntry);

      this.wholeData[0].data[0].weight[0] = this.allWeightTracker;
      this.dailyService.updateData(this.wholeData[0], this.userIndex);

      this.getAverage(this.allWeightTracker);
      this.editMode = false;
      form.reset();
      this.filterDays();
      this.chartDataUpdate();
      return;
    }

    let firstChecker = this.allWeightTracker.data.find((element: any) => {
      return Number(element[0].day) === date.day - 1;
    });

    let secondChecker = this.allWeightTracker.data.find((element: any) => {
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
      this.allWeightTracker.data.push(newEntry);
      this.wholeData[0].data[0].weight[0] = this.allWeightTracker;
      this.dailyService.updateData(this.wholeData[0], this.userIndex);

      this.getAverage(this.allWeightTracker);
      this.filterDays();
      form.reset();
      
    } else {
      alert(
        `Data for ${date.day}-${date.month}-${date.year} had already been registered`
        );
        return;
      }
      this.chartDataUpdate();
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


  onUpdate(element: any, i: any) {
    this.weightModel = element[1];
    this.model2 = element[0];
    this.editMode = true;
    this.indexOfUpdate = i;
  }


  onDelete(i: any) {
    this.indexOfUpdate = i;
    this.allWeightTracker.data.splice(this.indexOfUpdate, 1);

    this.wholeData[0].data[0].weight[0] = this.allWeightTracker;
    console.log(this.wholeData);
    this.dailyService.updateData(this.wholeData[0], this.userIndex);
 
    this.getAverage(this.allWeightTracker);
    this.filterDays();
    this.chartDataUpdate()
  }

  filterDays() {
    this.allWeightTracker.data.sort((a: any, b: any): any => {
      if (a[0].month === b[0].month) {
        return a[0].day - b[0].day;
      }
    });

    if (this.allWeightTracker.data.length > 7) {
      this.lastSevenData = this.allWeightTracker.data.slice(-7);
    } else {
      this.lastSevenData = this.allWeightTracker.data;
    }
  }

  toggleFunction(){
    if( this.toggler == true){
      this.toggler = false
      console.log(this.toggler);
      
    }else{
      this.toggler = true
      console.log(this.toggler);
      
    }
  }

  chartDataUpdate(){
    this.dates = []
    this.weights = []
    
    this.lastSevenData.forEach((res: any) => {
      this.dates.push(`${res[0].year}-${res[0].month}-${res[0].day}`);
      this.weights.push(Number(res[1]));
    });

    this.chart.data.datasets[0].data = this.weights
    this.chart.data.labels = this.dates

    this.chart.update()
  }
}
