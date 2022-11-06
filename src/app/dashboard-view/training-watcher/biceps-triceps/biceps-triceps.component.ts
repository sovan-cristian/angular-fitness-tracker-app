import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { DailyTrackersService } from 'src/app/core/services/daily-trackers.service';
import { ExercisesService } from 'src/app/core/services/exercises.service';
import { DailyTrackerStoreService } from 'src/app/store/daily-tracker-store.service';
import { FitnessDataStoreService } from 'src/app/store/fitness-data-store.service';

@Component({
  selector: 'app-biceps-triceps',
  templateUrl: './biceps-triceps.component.html',
  styleUrls: ['./biceps-triceps.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class BicepsTricepsComponent implements OnInit {
  model!: NgbDateStruct;
  today = this.calendar.getToday();
  buttonText = 'Next';
  public isChanged = true;
  bicepsAndTriceps!: any;

  idForEdit!: number;
  exerciseForEdit!: number;
  setForEdit!: string;

  userIndex!: number;
  wholeData!: any;

  newWorkout = {
    id: 1,
    date: {
      day: '',
      month: '',
      year: '',
    },
    sets: [{}],
  };

  exerciseNames = [
    'Biceps bar curl',
    'Biceps DB curl',
    '1 DB raise',
    'Bench DB kickback',
    'Skull crusher',
    'Wrist flexion',
  ];

  constructor(
    private calendar: NgbCalendar,
    config: NgbModalConfig,
    private modalService: NgbModal,
    private dailyTracker: DailyTrackerStoreService,
    private dailyService: DailyTrackersService
  ) {}

  ngOnInit(): void {
    this.newWorkout.sets.pop();

    this.dailyTracker.data$.subscribe((data) => {
      this.userIndex = data[0].id;
      this.wholeData = data;

      let placeHolder = data[0];
      this.bicepsAndTriceps = placeHolder.data[0].BicepsAndTriceps;
      this.filterWorkouts();
    });
  }

  openVerticallyCentered(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
  }

  firstNext(form: NgForm) {
    this.newWorkout.date.day = form.value.dp.day;
    this.newWorkout.date.month = form.value.dp.month;
    this.newWorkout.date.year = form.value.dp.year;

    this.isChanged = false;
  }

  secondNext(f: NgForm) {
    // if ((this.newWorkout.sets.length = 1)) {
    //   this.newWorkout.sets.pop();
    // }
    let exerciseObj = {
      name: '',
      firstSet: '',
      secondSet: '',
      thirdSet: '',
    };

    exerciseObj.name = f.value.select;
    exerciseObj.firstSet = f.value.firstSet;
    exerciseObj.secondSet = f.value.secondSet;
    exerciseObj.thirdSet = f.value.thirdSet;

    this.newWorkout.sets.push(exerciseObj);

    f.controls['select'].reset();
    f.controls['firstSet'].reset();
    f.controls['secondSet'].reset();
    f.controls['thirdSet'].reset();

    let alreadyFilled: string[] = [];

    this.newWorkout.sets.forEach((exercise: any) => {
      alreadyFilled.push(exercise?.name);
    });

    this.exerciseNames = this.exerciseNames.filter((data: any) => {
      return !alreadyFilled.includes(data);
    });

    if (this.newWorkout.sets.length == 5) {
      this.buttonText = 'Submit';
    }

    if (this.newWorkout.sets.length == 6) {
      this.newWorkout.id = Math.floor(Math.random() * 1000);
      this.wholeData[0].data[0].BicepsAndTriceps.push(this.newWorkout);
      this.dailyService.updateData(this.wholeData[0], this.userIndex);

      this.resetForm(f);
      this.filterWorkouts();
    }
  }

  onDelete(id: any) {
    let indexToChange;

    this.wholeData[0].data[0].BicepsAndTriceps.find(
      (element: any, index: any) => {
        indexToChange = index;
        return element.id == id;
      }
    );

    this.wholeData[0].data[0].BicepsAndTriceps.splice(indexToChange, 1);
    this.filterWorkouts();
    this.dailyService.updateData(this.wholeData[0], this.userIndex);
  }

  onUpdate(id: any, index: any, set: any, content: any) {
    this.idForEdit = id;
    this.exerciseForEdit = index;
    this.setForEdit = set;
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
  }

  updateData(newForm: NgForm) {
    let indexTest;
    let toBeUpdated = this.wholeData[0].data[0].BicepsAndTriceps.find(
      (data: any, index: any) => {
        indexTest = index;

        return data.id == this.idForEdit;
      }
    );

    toBeUpdated.sets[this.exerciseForEdit][this.setForEdit] =
      newForm.value.newSet;

    this.wholeData[0].data[0].BicepsAndTriceps.splice(
      indexTest,
      1,
      toBeUpdated
    );
    this.dailyService.updateData(this.wholeData[0], this.userIndex);

    this.modalService.dismissAll();
    newForm.reset();
  }

  cancelCheck(f: NgForm) {
    if (confirm('Are you sure you want to cancel? You will lose all data')) {
      this.resetForm(f);
    }
  }

  resetForm(f: NgForm) {
    this.modalService.dismissAll();
    f.reset();
    this.isChanged = true;

    this.newWorkout = {
      id: 1,
      date: {
        day: '',
        month: '',
        year: '',
      },
      sets: [{}],
    };

    this.exerciseNames = [
      'Biceps bar curl',
      'Biceps DB curl',
      '1 DB raise',
      'Bench DB kickback',
      'Skull crusher',
      'Wrist flexion',
    ];
  }

  filterWorkouts() {
    // this.bicepsAndTriceps.sort((a: any, b: any): any => {
    //   if (a.date.month === b.date.month) {
    //     return a.date.day - b.date.day;
    //   } else {
    //     return a.date.month - b.date.month;
    //   }
    // });
    if (this.bicepsAndTriceps.length > 3) {
      this.bicepsAndTriceps =
        this.wholeData[0].data[0].BicepsAndTriceps.slice(-3);
    } else {
      this.bicepsAndTriceps = this.wholeData[0].data[0].BicepsAndTriceps;
    }
  }
}
