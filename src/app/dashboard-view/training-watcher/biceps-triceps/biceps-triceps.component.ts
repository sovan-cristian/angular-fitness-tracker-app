import { Component, OnInit, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModal,
  NgbModalConfig,
  NgbModalOptions,
} from '@ng-bootstrap/ng-bootstrap';
import { ExercisesService } from 'src/app/core/services/exercises.service';
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

  newWorkout = {
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
    private fitnessData: ExercisesService,
    private fitnessDataStore: FitnessDataStoreService,
    private exerciseService: ExercisesService
  ) {}

  ngOnInit(): void {
    this.newWorkout.sets.pop();

    this.fitnessDataStore.exercises$.subscribe((data) => {
      this.bicepsAndTriceps = data;
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

    console.log(this.exerciseNames);

    if (this.newWorkout.sets.length == 5) {
      this.buttonText = 'Submit';
    }

    if (this.newWorkout.sets.length == 6) {
      this.fitnessData.addBiandTri(this.newWorkout);
      this.fitnessData.getBiandTri().subscribe((data) => {
        this.bicepsAndTriceps = data;
        this.filterWorkouts();
      });
      this.resetForm(f);
    }
  }

  onDelete(id: any) {
    this.exerciseService.deleteBiandTri(id);
    this.fitnessData.getBiandTri().subscribe((data) => {
      this.bicepsAndTriceps = data;
      this.filterWorkouts();
    });
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
    let toBeUpdated = this.bicepsAndTriceps.find((data: any) => {
      return data.id == this.idForEdit;
    });

    toBeUpdated.sets[this.exerciseForEdit][this.setForEdit] =
      newForm.value.newSet;

    this.exerciseService.updateBiandTri(this.idForEdit, toBeUpdated);

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
    if (this.bicepsAndTriceps.length > 3) {
      this.bicepsAndTriceps = this.bicepsAndTriceps.slice(-3);
    } else {
      this.bicepsAndTriceps = this.bicepsAndTriceps;
    }
  }
}
