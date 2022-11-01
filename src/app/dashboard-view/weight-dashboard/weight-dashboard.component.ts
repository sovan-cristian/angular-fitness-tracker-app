import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-weight-dashboard',
  templateUrl: './weight-dashboard.component.html',
  styleUrls: ['./weight-dashboard.component.css'],
})
export class WeightDashboardComponent implements OnInit {
  result = 0;

  dailyTrackers = [
    {
      name: 'Weight Tracker',
      unit: 'Weight (kg)',
      data: [
        ['04-10-2022', '82'],
        ['04-10-2022', '85'],
        ['04-10-2022', '87'],
        ['04-10-2022', '86'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
      ],
    },
    {
      name: 'Calorie Tracker',
      unit: 'Calories',
      data: [
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
      ],
    },
    {
      name: 'Waist Tracker',
      unit: 'Waist Size (cm)',
      data: [
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
        ['04-10-2022', '87'],
      ],
    },
  ];

  weightTracker = this.dailyTrackers.find((element) => {
    return element.name === 'Weight Tracker';
  });

  length = this.weightTracker?.data.length;

  constructor() {}

  ngOnInit(): void {
    this.weightTracker?.data.forEach((item) => {
      this.result = this.result + Number(item[1]);
    });
  }
}
