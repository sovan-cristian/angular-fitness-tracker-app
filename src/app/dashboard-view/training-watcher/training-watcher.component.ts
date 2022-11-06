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
