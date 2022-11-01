import { Component, OnInit } from '@angular/core';
import { NgbCalendar, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-training-watcher',
  templateUrl: './training-watcher.component.html',
  styleUrls: ['./training-watcher.component.css'],
})
export class TrainingWatcherComponent implements OnInit {
  model!: NgbDateStruct;
  today = this.calendar.getToday();

  public isCollapsed = true;

  chestandShoulder = [
    {
      date: '04.10.2022',
      sets: [
        ['Biceps bar curl', '25/12', '27.5/10', '30/8'],
        ['Biceps DB curl', '11/24', '12.5/20', '15/20'],
        ['1 DB raise', '17.5/12', '20/10', '22.5/10'],
        ['Bench DB kickback', '7/12', '7/10', '9/8'],
        ['Skull crusher', '12.5/12', '15/10', '17.5/10'],
        ['Wrist flexion', '7/24', '7/20', '7/16'],
      ],
    },
    {
      date: '04.10.2022',
      sets: [
        ['Biceps bar curl', '25/12', '27.5/10', '30/8'],
        ['Biceps DB curl', '11/24', '12.5/20', '15/20'],
        ['1 DB raise', '17.5/12', '20/10', '22.5/10'],
        ['Bench DB kickback', '7/12', '7/10', '9/8'],
        ['Skull crusher', '12.5/12', '15/10', '17.5/10'],
        ['Wrist flexion', '7/24', '7/20', '7/16'],
      ],
    },
    {
      date: '04.10.2022',
      sets: [
        ['Biceps bar curl', '25/12', '27.5/10', '30/8'],
        ['Biceps DB curl', '11/24', '12.5/20', '15/20'],
        ['1 DB raise', '17.5/12', '20/10', '22.5/10'],
        ['Bench DB kickback', '7/12', '7/10', '9/8'],
        ['Skull crusher', '12.5/12', '15/10', '17.5/10'],
        ['Wrist flexion', '7/24', '7/20', '7/16'],
      ],
    },
  ];

  constructor(private calendar: NgbCalendar) {}

  ngOnInit(): void {}

  toggle() {
    if (this.isCollapsed === true) {
      this.isCollapsed = false;
    } else {
      this.isCollapsed = true;
    }
  }
}
