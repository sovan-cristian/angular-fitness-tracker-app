import { Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { DailyTrackersService } from 'src/app/core/services/daily-trackers.service';
import { ExercisesService } from 'src/app/core/services/exercises.service';
import { DailyTrackerStoreService } from 'src/app/store/daily-tracker-store.service';
import { FitnessDataStoreService } from 'src/app/store/fitness-data-store.service';

@Component({
  selector: 'app-chest-shoulders',
  templateUrl: './chest-shoulders.component.html',
  styleUrls: ['./chest-shoulders.component.css'],
})
export class ChestShouldersComponent implements OnInit {
  model!: NgbDateStruct;
  today = this.calendar.getToday();
  buttonText = 'Next';
  public isChanged = true;
  chestAndShoulders!: any;

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
    'Bench press',
    'Inclined press',
    'Bench DB press',
    'Fluturari umeri',
    'Front disc raise',
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
      this.chestAndShoulders = placeHolder.data[0].ChestAndShoulder;
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

    if (this.newWorkout.sets.length == 4) {
      this.buttonText = 'Submit';
    }

    if (this.newWorkout.sets.length == 5) {
      this.newWorkout.id = Math.floor(Math.random() * 1000);
      this.wholeData[0].data[0].ChestAndShoulder.push(this.newWorkout);
      this.dailyService.updateData(this.wholeData[0], this.userIndex);

      this.resetForm(f);
      this.filterWorkouts();
    }
  }

  onDelete(id: any) {
    let indexToChange;

    this.wholeData[0].data[0].ChestAndShoulder.find(
      (element: any, index: any) => {
        indexToChange = index;
        return element.id == id;
      }
    );

    this.wholeData[0].data[0].ChestAndShoulder.splice(indexToChange, 1);
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
    let toBeUpdated = this.wholeData[0].data[0].ChestAndShoulder.find(
      (data: any, index: any) => {
        indexTest = index;

        return data.id == this.idForEdit;
      }
    );

    toBeUpdated.sets[this.exerciseForEdit][this.setForEdit] =
      newForm.value.newSet;

    this.wholeData[0].data[0].ChestAndShoulder.splice(
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
      'Bench press',
      'Inclined press',
      'Bench DB press',
      'Fluturari umeri',
      'Front disc raise',
    ];
  }

  filterWorkouts() {
    if (this.chestAndShoulders.length > 3) {
      this.chestAndShoulders =
        this.wholeData[0].data[0].ChestAndShoulder.slice(-3);
    } else {
      this.chestAndShoulders = this.wholeData[0].data[0].ChestAndShoulder;
    }
  }
}
