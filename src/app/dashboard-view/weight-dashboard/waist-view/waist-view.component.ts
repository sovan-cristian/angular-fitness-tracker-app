import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-waist-view',
  templateUrl: './waist-view.component.html',
  styleUrls: ['./waist-view.component.css'],
})
export class WaistViewComponent implements OnInit {
  resultRounded!: number;
  model4!: string;
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
    return element.name === 'Waist Tracker';
  });

  constructor() {}

  ngOnInit(): void {
    let result = 0;
    this.weightTracker?.data.forEach((item) => {
      result = result + Number(item[1]);
    });

    this.resultRounded = Number(
      (Math.round((result / 7) * 100) / 100).toFixed(2)
    );
  }
}
