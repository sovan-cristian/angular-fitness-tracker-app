import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Chart, registerables } from 'chart.js';
import { DailyTrackersService } from 'src/app/core/services/daily-trackers.service';
import { DailyTrackerStoreService } from 'src/app/store/daily-tracker-store.service';

@Component({
  selector: 'app-calorie-view',
  templateUrl: './calorie-view.component.html',
  styleUrls: ['./calorie-view.component.css'],
})
export class CalorieViewComponent implements OnInit {
  resultRounded!: number;
  model2!: any;
  allCaloriesTracker!: any;
  lastSevenData!: [];
  caloriesModel!: any;
  editMode = false;
  indexOfUpdate!: number;
  userIndex!: number;
  wholeData!: any;

  togglerCalories = true
  datesCalories:string[] = [];
  calories: number[] = [];
  

  chartCalories: any;
  canvasCalories!:any;

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
      this.allCaloriesTracker = test.data[0].calories[0];
      this.filterDays();

      this.lastSevenData?.forEach((res: any) => {
        this.datesCalories.push(`${res[0].year}-${res[0].month}-${res[0].day}`);
        this.calories.push(Number(res[1]));
      });

      let unit = `${this.allCaloriesTracker.unit}`

      this.canvasCalories = document.getElementById('canvas')
      this.chartCalories = new Chart(this.canvasCalories, {
        type: 'line',
        data: {
          labels: this.datesCalories,
          datasets: [{
            label: unit,
            data: this.calories,
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

      this.getAverage(this.allCaloriesTracker);
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
      this.allCaloriesTracker.data.splice(this.indexOfUpdate, 1, newEntry);

      this.wholeData[0].data[0].calories[0] = this.allCaloriesTracker;
      this.dailyService.updateData(this.wholeData[0], this.userIndex);

      this.getAverage(this.allCaloriesTracker);
      this.editMode = false;
      form.reset();
      this.filterDays();
      this.chartDataUpdate();
      return;
    }

    let firstChecker = this.allCaloriesTracker.data.find((element: any) => {
      return Number(element[0].day) === date.day - 1;
    });

    let secondChecker = this.allCaloriesTracker.data.find((element: any) => {
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
      this.allCaloriesTracker.data.push(newEntry);
      this.wholeData[0].data[0].calories[0] = this.allCaloriesTracker;
      this.dailyService.updateData(this.wholeData[0], this.userIndex);

      this.getAverage(this.allCaloriesTracker);
      this.filterDays;
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
    this.caloriesModel = element[1];
    this.model2 = element[0];
    this.editMode = true;
    this.indexOfUpdate = i;
  }

  onDelete(i: any) {
    this.indexOfUpdate = i;
    this.allCaloriesTracker.data.splice(this.indexOfUpdate, 1);

    this.wholeData[0].data[0].calories[0] = this.allCaloriesTracker;
    this.dailyService.updateData(this.wholeData[0], this.userIndex);

    this.getAverage(this.allCaloriesTracker);
    this.filterDays();
    this.chartDataUpdate();
  }

  filterDays() {
    this.allCaloriesTracker.data.sort((a: any, b: any): any => {
      if (a[0].month === b[0].month) {
        return a[0].day - b[0].day;
      }
    });

    if (this.allCaloriesTracker.data.length > 7) {
      this.lastSevenData = this.allCaloriesTracker.data.slice(-7);
    } else {
      this.lastSevenData = this.allCaloriesTracker.data;
    }
  }

  toggleFunction(){
    if( this.togglerCalories == true){
      this.togglerCalories = false
      console.log(this.togglerCalories);
      
    }else{
      this.togglerCalories = true
      console.log(this.togglerCalories);
      
    }
  }

  chartDataUpdate(){
    this.datesCalories = []
    this.calories = []
    
    this.lastSevenData.forEach((res: any) => {
      this.datesCalories.push(`${res[0].year}-${res[0].month}-${res[0].day}`);
      this.calories.push(Number(res[1]));
    });

    this.chartCalories.data.datasets[0].data = this.calories
    this.chartCalories.data.labels = this.datesCalories

    this.chartCalories.update()
  }
}
