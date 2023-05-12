var workoutDB;
var equipmentDB;

class TableDatabase {
  constructor(userName) {
    this.userName = userName;
  }
}

/** 
function makeStruct(keys) {
    if (!keys) {
        return null;
    }
    const k = keys.split(', ');
    const count = k.length;

    function constructor(){
        for (let i = 0; i < count; i++){
            this[k[i]] = arguments[i];
        }
    }
    return constructor;
}
*/
//const Workout = new makeStruct('workoutName, noSet, noRep, muscleGroup, equipment, difficulty');

//const newWorkout = new Workout('myWorkoutName, myNoSet, myNoRep')

//console.log("Hello, world!");
//constructor(int tableNo, )

class JAWSclient {
  constructor() {
    workoutDB = new WorkoutDatabase();
    equipmentDB = new EquipmentDatabase();
  }
  runMain() {
    console.log('this is the main');
    //main

    //arms example
    workoutDB.addWorkout(3, 10, 'dumbbell curl', 'Arms', 'Dumbbell', 0);
    workoutDB.addWorkout(4, 10, 'bench', 'Arms', 'Barbell', 0);
    workoutDB.addWorkout(5, 10, 'barbell curl', 'Arms', 'Barbell', 0);

    //legs example
    workoutDB.addWorkout(3, 10, 'squat', 'Legs', 'Dumbbell', 1);
    workoutDB.addWorkout(4, 10, 'deadlift', 'Legs', 'Barbell', 1);
    workoutDB.addWorkout(5, 10, 'box squat', 'Legs', 'BarbellAndBox', 1);

    //back example
    workoutDB.addWorkout(3, 10, 'pullups', 'Back', 'Dumbbell', 2);
    workoutDB.addWorkout(4, 10, 'bent over rows', 'Back', 'Dumbbell', 2);
    workoutDB.addWorkout(5, 10, 'push up rows', 'Back', 'Dumbbell', 2);

    //console.log(workoutDB);

    equipmentDB.addEquipment('Dumbbell');
    equipmentDB.addEquipment('Barbell');
    let lj = new User(
      'lojay',
      'password1',
      'easy',
      'male',
      '24',
      '205',
      '5',
      '10',
      ['Arms', 'Legs', 'Back'],
      ['Dumbbell', 'Barbell']
    );
    console.log(lj.generateWeekList());
    //console.log(lj.equipmentList);
    //console.log(lj.generateRandomWorkout("Arms",lj.equipmentList));
  }
}

var myClient = new JAWSclient();
myClient.runMain();
