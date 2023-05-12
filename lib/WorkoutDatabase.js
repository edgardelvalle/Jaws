class WorkoutDatabase {
  constructor() {
    this.workoutDatabase = [];
  }
  addWorkout(reps, sets, workoutName, muscleGroup, equipment, difficulty) {
    //add workout
    let workoutExists = false;
    for (let i = 0; i < this.workoutDatabase.length; i++) {
      if (workoutName == this.workoutDatabase[i].workoutName) {
        workoutExists = true;
      }
    }
    if (workoutExists == false) {
      console.log('Adding ' + workoutName + ' to the workout database.');
      const newWorkout = new Workout(
        workoutName,
        sets,
        reps,
        muscleGroup,
        equipment,
        difficulty
      );
      this.workoutDatabase.push(newWorkout);
      return this.workoutDatabase;
    } else {
      console.log('Error: Workout already exists. Workout not added.');
      return this.workoutDatabase;
    }
  }
  removeWorkout(workoutName) {
    //remove workout
    for (let i = 0; i < this.workoutDatabase.length; i++) {
      if (workoutName == this.workoutDatabase[i].workoutName) {
        this.workoutDatabase.splice(i, 1);
      }
    }
    return this.workoutDatabase;
  }
  getWorkoutDatabase() {
    return this.workoutDatabase;
  }
}
