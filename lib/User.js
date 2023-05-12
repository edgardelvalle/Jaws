class User {
  constructor(
    userName,
    password,
    intensity,
    sex,
    age,
    weight,
    heightFt,
    heightIn,
    muscleGroupList,
    equipmentList
  ) {
    this.userName = userName;
    this.password = password;
    this.intensity = intensity;
    this.sex = sex;
    this.age = age;
    this.weight = weight;
    this.heightFt = heightFt; //feet of height
    this.heightIn = heightIn; //inches of height
    this.totalHeightIn + heightFt * 12; //height in inches
    this.muscleGroupList = muscleGroupList;
    this.equipmentList = equipmentList;
    this.bmi = weight / (this.totalHeightIn * this.totalHeightIn);
    this.difficulty = this.getDifficulty();

    this.TableDatabase = new TableDatabase(this.userName);
  }

  getDifficulty() {
    if (this.bmi > 25) {
      return 0; //beginner
    } else if (this.bmi >= 18 && this.bmi <= 25) {
      return 1; //amateur
    } else {
      return 2; //expert
    }
  }
  generateRandomWorkout(muscleGroupChoice, equipmentList) {
    //ERROR HERE!!
    // const workoutsWithMuscle = wo.getWorkoutDatabase().filter(workout => workout.muscleGroup == muscleGroup && workout.equipment == )
    this.muscleGroupChoice = muscleGroupChoice;
    this.workoutDB = workoutDB.getWorkoutDatabase();
    this.equipmentDB = equipmentDB.getEquipmentDatabase();
    let workoutGroupList = [];
    let hasEquipment = false;
    let generatedWorkout = null;
    //cycle through all workouts with muscle group "arms" return a list of it

    //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

    //console.log((workoutDB.getWorkoutDatabase()[0]).muscleGroup);
    //console.log(workoutDB);

    //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

    for (let i = 0; i < this.workoutDB.length; i++) {
      if (this.workoutDB[i].muscleGroup == this.muscleGroupChoice) {
        //works
        //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

        //console.log(this.workoutDB[i].muscleGroup);

        //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

        if (this.workoutDB[i] != null) {
          //console.log(this.workoutDB[i].name);
          workoutGroupList.push(this.workoutDB[i]);
        }
        // for (let j = 0; j < workoutGroupList.length; j++){
        //     if(workoutDB[j].equipment){
        //         workoutGroupList.push(workoutDB[j]);
        //         hasEquipment = true;
        //     }
        // }
      }

      //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

      //console.log(workoutGroupList);

      //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~
    }

    //check if user has the equipment by comparing user equipment list to possible workouts.
    //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

    //console.log(workoutGroupList.length);
    //console.log("LJ TEST: " + workoutGroupList[0].equipment);
    //console.log(equipmentList.length);

    //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

    let equipmentWorkoutGroupList = [];
    for (let j = 0; j < this.equipmentList.length; j++) {
      for (let k = 0; k < workoutGroupList.length; k++) {
        //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

        //console.log("LJ TEST: " + workoutGroupList[0].equipment);
        //console.log("LJ TEST: " + equipmentList);

        //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

        if (workoutGroupList[k].equipment == this.equipmentList[j]) {
          equipmentWorkoutGroupList.push(workoutGroupList[k]);
          hasEquipment = true;
        }
      }
    }
    //check if user workout is correct difficulty
    this.validWorkoutGroupList = [];
    for (let n = 0; n < equipmentWorkoutGroupList.length; n++) {
      //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

      //console.log("LJ TEST: " + equipmentWorkoutGroupList[0].difficulty);
      //console.log("LJ TEST2: " + this.difficulty);
      //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

      if (equipmentWorkoutGroupList[n].difficulty <= this.difficulty) {
        //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

        //console.log("LJ TEST: " + equipmentWorkoutGroupList[0].difficulty);

        //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

        this.validWorkoutGroupList.push(equipmentWorkoutGroupList[n]);
      }
    }

    //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

    //console.log("LJ TEST: " + this.validWorkoutGroupList);

    //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

    //create random number then insert random number modulo based off array length
    if (hasEquipment) {
      this.randomNumber = Math.floor(
        Math.random() * this.validWorkoutGroupList.length
      ); //generates number (0) to (workout group list length)
      generatedWorkout = this.validWorkoutGroupList[this.randomNumber];
    }
    //if (checkEquipment(this.workoutGroupList[randomNumber]))
    //return workoutGroupList[randomNumber];

    //return valid workout
    return generatedWorkout;
  }
  generateDayList(muscleGroupChoice) {
    this.muscleGroupChoice = muscleGroupChoice;
    let dayList = [];
    // if(this.User.bmi == "beginner"){
    //     difficultyMultiplier = 1;
    // }
    // else if(this.User.bmi == "medium"){
    //     difficultyMultiplier = 3;
    // }
    // else if(this.User.bmi == "hard"){
    //     difficultyMultiplier = 5;
    // }
    for (let i = 0; i < 3; i++) {
      //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

      //console.log("LJ TEST: " + this.muscleGroupChoice);
      //console.log("LJ TEST: " + this.generateRandomWorkout(this.muscleGroupChoice));

      //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

      if (this.generateRandomWorkout(this.muscleGroupChoice) != null) {
        this.generatedWorkout = this.generateRandomWorkout(
          this.muscleGroupChoice
        );
        dayList.push(this.generatedWorkout);
      } else {
        dayList.push('plyometrics workout');
      }
    }
    return dayList;
  }
  generateWeekList() {
    let weekList = [];
    let muscleListCounter = 0;
    for (let i = 0; i < 7; i++) {
      weekList.push(
        this.generateDayList(this.muscleGroupList[muscleListCounter])
      );
      muscleListCounter++;
      if (muscleListCounter == 3) {
        muscleListCounter = 0;
      }
    }
    return weekList;
  }

  //     //randomNumber = Math.floor(Math.random() * 10); //generates number 0-9
  //     switch (muscleGroup){
  //         case "Arms":
  //             var workoutGroupList = [];
  //             //cycle through all workouts with muscle group "arms" return a list of it
  //             for(let i = 0; i < workoutDB.length; i++){
  //                 if(workoutDB[i].muscleGroup = "Arms"){
  //                     workoutGroupList.push(workoutDB[i]);
  //                 }
  //             }
  //             //create random number
  //             randomNumber = Math.floor(Math.random() * workoutGroupList.length); //generates number 0-workout group list length
  //             //random number modulo array length
  //             return workoutDB[randomNumber];
  //         case "Legs":
  //             var workoutGroupList = [];
  //             //cycle through all workouts with muscle group "arms" return a list of it
  //             for(let i = 0; i < workoutDB.length; i++){
  //                 if(workoutDB[i].muscleGroup = "Legs"){
  //                     workoutGroupList.push(workoutDB[i]);
  //                 }
  //             }
  //             //create random number
  //             randomNumber = Math.floor(Math.random() * workoutGroupList.length); //generates number 0-workout group list length
  //             //random number modulo array length
  //             return workoutDB[randomNumber];
  //             break;
  //         case "Back":
  //             break;
  //         case "Abs":
  //             break;
  //         case "Chest":
  //             break;
  //         case "Cardio":
  //             break;
  //         default:
  //     }
  // }
}
