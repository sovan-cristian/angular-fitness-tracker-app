import { Component, OnInit} from '@angular/core';
import { NgForm } from '@angular/forms';
import {
  NgbCalendar,
  NgbDateStruct,
  NgbModal,
  NgbModalConfig,
} from '@ng-bootstrap/ng-bootstrap';
import { DailyTrackersService } from 'src/app/core/services/daily-trackers.service';
import { DailyTrackerStoreService } from 'src/app/store/daily-tracker-store.service';

@Component({
  selector: 'app-biceps-triceps',
  templateUrl: './biceps-triceps.component.html',
  styleUrls: ['./biceps-triceps.component.css'],
  providers: [NgbModalConfig, NgbModal],
})
export class BicepsTricepsComponent implements OnInit {
  // Variables for Calendar Input 
  model!: NgbDateStruct;
  today = this.calendar.getToday();

  wholeData!: any;
  buttonText = 'Next';
  public isChanged = true;
  bicepsAndTriceps!: any;

  // Variables for editing entries
  idForEdit!: number;
  exerciseForEdit!: number;
  setForEdit!: string;


  userIndex!: number;

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

    // Importing whole data set from server and assiging the data needed by this tracker to a variable.
    this.dailyTracker.data$.subscribe((data) => {
      this.userIndex = data[0].id;
      this.wholeData = data;

      let placeHolder = data[0];
      this.bicepsAndTriceps = placeHolder.data[0].BicepsAndTriceps;
      this.filterWorkouts();
    });
    
  }

  // Utility function for Modal to open centered
  openVerticallyCentered(content: any) {
    this.modalService.open(content, {
      backdrop: 'static',
      keyboard: false,
      centered: true,
    });
  }

  // Action for the 'Next' button on the first step of the New Workout modal
  // Keeping track of the date the user selects
  firstNext(form: NgForm) {
    this.newWorkout.date.day = form.value.dp.day;
    this.newWorkout.date.month = form.value.dp.month;
    this.newWorkout.date.year = form.value.dp.year;

    this.isChanged = false;
  }

  // Action for the 'Next' on the second step of the New Workout modal
  // This stores the data for each exercise (Sets and reps)
  secondNext(f: NgForm) {
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

    // Variable to keep track which exercises were alreay filled with sets and reps
    let alreadyFilled: string[] = [];

    this.newWorkout.sets.forEach((exercise: any) => {
      alreadyFilled.push(exercise?.name);
    });

    // Takes out the exercise names from the select element the user sees of the ones already filled in
    this.exerciseNames = this.exerciseNames.filter((data: any) => {
      return !alreadyFilled.includes(data);
    });

    // Changes the button text from 'Next' to 'Submit' before the last exercise in the workout
    if (this.newWorkout.sets.length == 5) {
      this.buttonText = 'Submit';
    }

    // Replaces old dataset for this workout with the one containing the input from the user.
    // Then send the whole data to the JSON server database
    if (this.newWorkout.sets.length == 6) {
      this.newWorkout.id = Math.floor(Math.random() * 1000);
      this.wholeData[0].data[0].BicepsAndTriceps.push(this.newWorkout);
      this.dailyService.updateData(this.wholeData[0], this.userIndex);

      this.filterWorkouts();
      this.resetForm(f);

      this.buttonText = 'Next'
      this.newWorkout.sets.pop();
    }
  }

  onDelete(id: any) {
    let indexToChange;

    // Finds the entry in the whole dataset with the matching id
    this.wholeData[0].data[0].BicepsAndTriceps.find(
      (element: any, index: any) => {
        indexToChange = index;
        return element.id == id;
      }
    );

    // Deletes that entry from the whole data and then updates the JSON Server database with a Patch request
    this.wholeData[0].data[0].BicepsAndTriceps.splice(indexToChange, 1);
    this.filterWorkouts();
    this.dailyService.updateData(this.wholeData[0], this.userIndex);
  }

  // Action for when update button is pressed next to each fo the sets and reps
  // Takes id, the index in the array, the set it is part of and keeps track of them
  // Opens modal for Update
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

  // Finds the date entry in the Whole Data set
  updateData(newForm: NgForm) {
    let indexTest;
    let toBeUpdated = this.wholeData[0].data[0].BicepsAndTriceps.find(
      (data: any, index: any) => {
        indexTest = index;
        return data.id == this.idForEdit;
      }
    );

    // Replaces value for that individual exercise in the specific date entry
    toBeUpdated.sets[this.exerciseForEdit][this.setForEdit] =
      newForm.value.newSet;

    // Replaces the object build above in the whole data set
    this.wholeData[0].data[0].BicepsAndTriceps.splice(
      indexTest,
      1,
      toBeUpdated
    );
    
    // Updates the whole data set on the JSON Server dataset
    this.dailyService.updateData(this.wholeData[0], this.userIndex);

    // Close Modal and reset it
    this.modalService.dismissAll();
    newForm.reset();
  }

  // Confirmation check for the user that they want to exit a modal
  // Resets the form
  cancelCheck(f: NgForm) {
    if (confirm('Are you sure you want to cancel? You will lose all data')) {
      this.resetForm(f);
    }
  }

  // Reset form actions
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

  // Filtering method from the whole data set
  // Builds an array with only the three latest workout date objects which is used to create each table
  filterWorkouts() {
    this.wholeData[0].data[0].BicepsAndTriceps.sort((a: any, b: any): any => {
      if (a.date.month === b.date.month) {
        return a.date.day - b.date.day;
      } else {
        return a.date.month - b.date.month;
      }
    });
    
    if (this.bicepsAndTriceps.length >= 3) {
      this.bicepsAndTriceps =
        this.wholeData[0].data[0].BicepsAndTriceps.slice(-3);
    } else {
      this.bicepsAndTriceps = this.wholeData[0].data[0].BicepsAndTriceps;
    }
  }
}
