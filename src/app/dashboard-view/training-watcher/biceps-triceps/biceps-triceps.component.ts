import { Component, OnInit } from '@angular/core';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-biceps-triceps',
  templateUrl: './biceps-triceps.component.html',
  styleUrls: ['./biceps-triceps.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class BicepsTricepsComponent implements OnInit {
  model!: NgbDateStruct;
  today = this.calendar.getToday();

  public isChanged = true;

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

  constructor(
    private calendar: NgbCalendar,
    config: NgbModalConfig,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {}

  openVerticallyCentered(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
  }

  test() {
    this.isChanged = false;
  }
}
