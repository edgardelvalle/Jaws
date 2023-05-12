var workoutDB
var equipmentDB

class WorkoutDatabase{
    constructor(){
        this.workoutDatabase = [];
    }
    addWorkout(reps, sets, workoutName, muscleGroup, equipment, difficulty)
    {
        //add workout
        let workoutExists = false;
        for (let i = 0; i < this.workoutDatabase.length; i++){
            if (workoutName == this.workoutDatabase[i].workoutName){
                workoutExists = true;
            }
        }
        if (workoutExists == false){
            console.log('Adding ' + workoutName + ' to the workout database.');
            const newWorkout = new Workout(workoutName, sets, reps, muscleGroup, equipment, difficulty);
            this.workoutDatabase.push(newWorkout);
            return this.workoutDatabase;
        }
        else{
            console.log('Error: Workout already exists. Workout not added.');
            return this.workoutDatabase;
        }
    }
    removeWorkout(workoutName)
    {
        //remove workout
        for (let i = 0; i < this.workoutDatabase.length; i++){
            if (workoutName == this.workoutDatabase[i].workoutName){
                this.workoutDatabase.splice(i,1);
            }
        }
        return this.workoutDatabase;
    }
    getWorkoutDatabase()
    {
        return this.workoutDatabase;
    }
}

class EquipmentDatabase{
    constructor(){
        this.equipmentDatabase = [];
    }
    checkEquipment(equipment){
        let equipmentExists = false;
        for (let i = 0; i < this.equipmentDatabase.length; i++){
            if (equipment == this.equipmentDatabase[i]){
                equipmentExists = true;
            }
        }
        return equipmentExists;
    }
    addEquipment(equipment){
        //add workout
        // equipmentExists = false;
        // for (let i = 0; i < equipmentDatabase.length; i++){
        //     if (equipment == equipmentDatabase[i]){
        //         equipmentExists = true;
        //     }
        // }
        if(this.checkEquipment(equipment))
            this.equipmentDatabase.push(equipment)
    }
    removeEquipment(equipment)
    {
        //remove workout
        for (let i = 0; i < this.equipmentDatabase.length; i++){
            if (equipment == this.equipmentDatabase[i]){
                this.equipmentDatabase.splice(i,1);
            }
        }
    }
    getEquipmentDatabase()
    {
        if (this.equipmentDatabase == null){ //or NaN
            return 'empty';
        }
        return this.equipmentDatabase;
    }
}


// class Table{
//     // constructor(muscleGroupList, intensity, sex, age, weight, height)
//     // {
//     //     this.muscleGroupList = muscleGroupList;
//     //     this.sex = sex;
//     //     this.age = age;
//     //     this.weight = weight;
//     //     this.height = height;
//     // }
//     constructor(){
//     }
//     calculateTable(User)
//     {

//     }
// }

class Workout{
    constructor(name, sets, reps, muscleGroup, equipment, difficulty, instruction = ""){
        this.name = name;
        // this.type = type;
        this.sets = sets;
        this.reps = reps;
        this.muscleGroup = muscleGroup;
        this.equipment = equipment;
        this.difficulty = difficulty;
        this.instruction = instruction;
    }
}

class User{
    constructor(userName, password, intensity, sex, age, weight, heightFt, heightIn, muscleGroupList, equipmentList, difficulty = 0){
        this.userName = userName;
        this.password = password;
        this.intensity = intensity;
        this.sex = sex;
        this.age = age;
        this.weight = weight;
        this.heightFt = heightFt; //feet of height
        this.heightIn = heightIn //inches of height
        this.totalHeightIn + (heightFt * 12); //height in inches
        this.muscleGroupList = muscleGroupList;
        this.equipmentList = equipmentList;
        this.bmi = weight / (this.totalHeightIn*this.totalHeightIn);
        this.difficulty = this.getDifficulty();
        
        this.TableDatabase = new TableDatabase(this.userName);
    }

    getDifficulty(){
        if(this.bmi > 25){
            return 0; //beginner
        }
        else if((this.bmi >= 18) && (this.bmi <= 25)){
            return 1; //amateur
        }
        else{
            return 2; //expert
        }
    }
    generateRandomWorkout(muscleGroupChoice, equipmentList){ //ERROR HERE!!
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

        for(let i = 0; i < this.workoutDB.length; i++)
        {
            if(this.workoutDB[i].muscleGroup == this.muscleGroupChoice) //works
            {
                //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

                //console.log(this.workoutDB[i].muscleGroup);

                //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

                if(this.workoutDB[i] != null){
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
        for(let j = 0; j < this.equipmentList.length; j++){
            for(let k = 0; k < workoutGroupList.length; k++){

                //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

                //console.log("LJ TEST: " + workoutGroupList[0].equipment);
                //console.log("LJ TEST: " + equipmentList);

                //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

                if(workoutGroupList[k].equipment == this.equipmentList[j]){
                    equipmentWorkoutGroupList.push(workoutGroupList[k]);
                    hasEquipment = true;
                }
            }
        }
        //check if user workout is correct difficulty
        this.validWorkoutGroupList = [];
        for(let n = 0; n < equipmentWorkoutGroupList.length; n++){

            //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

            //console.log("LJ TEST: " + equipmentWorkoutGroupList[0].difficulty);
            //console.log("LJ TEST2: " + this.difficulty);
            //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

            if(equipmentWorkoutGroupList[n].difficulty <= this.difficulty){

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
        if(hasEquipment){
            this.randomNumber = Math.floor(Math.random() * this.validWorkoutGroupList.length); //generates number (0) to (workout group list length)
            generatedWorkout = this.validWorkoutGroupList[this.randomNumber];
        }
        //if (checkEquipment(this.workoutGroupList[randomNumber]))
            //return workoutGroupList[randomNumber];
        
            //return valid workout
        return generatedWorkout;
    }
    generateDayList(muscleGroupChoice)
    {
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
        for(let i = 0; i < 3; i++){

            //~~~~~~~~~~~~~~start LJ TEST~~~~~~~~~~~~~~~~~~

            //console.log("LJ TEST: " + this.muscleGroupChoice);
            //console.log("LJ TEST: " + this.generateRandomWorkout(this.muscleGroupChoice));

            //~~~~~~~~~~~~~~end LJ TEST~~~~~~~~~~~~~~~~~~

            if(this.generateRandomWorkout(this.muscleGroupChoice) != null){
                this.generatedWorkout = this.generateRandomWorkout(this.muscleGroupChoice)
                dayList.push(this.generatedWorkout);
            }
            else{
                dayList.push("plyometrics workout");
            }
        }
        return dayList;
    }
    generateWeekList(){
        let weekList = [];
        let muscleListCounter = 0;
        for(let i = 0; i < 7; i++){
            weekList.push(this.generateDayList(this.muscleGroupList[muscleListCounter]));
            muscleListCounter++;
            if (muscleListCounter == 2){
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
// class Day{ //MOVED FUNCTION TO USER
//     //Math.floor(Math.random() * 10); // random number between 0-9
//     constructor(User)
//     {
//         this.User = User;
//         //this.reps = 0;
//         //this.sets = 0;
//         //this.difficultyMultiplier = 1;
//     }

//     generateDayList(muscleGroupChoice, Workout)
//     {
//         dayList = [];
//         // if(this.User.bmi == "beginner"){
//         //     difficultyMultiplier = 1;
//         // }
//         // else if(this.User.bmi == "medium"){
//         //     difficultyMultiplier = 3;
//         // }
//         // else if(this.User.bmi == "hard"){
//         //     difficultyMultiplier = 5;
//         // }
//         for(let i = 0; i < 2; i++){
//             if(this.User.generateRandomWorkout(this.muscleGroupChoice) != null){
//                 let generatedWorkout = this.User.generateRandomWorkout(this.muscleGroupChoice)
//                 this.generatedWorkout
//                 dayList.push();
//             }
//             else{
//                 dayList.push("plyometrics workout");
//             }
//         }
//         return dayList;
//     }
// }

class TableDatabase{
    constructor(userName){
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



class JAWSclient{
    constructor(){
        workoutDB = new WorkoutDatabase()
        equipmentDB = new EquipmentDatabase();
    }
    runMain(){
        console.log('this is the main');
        //main

        //arms example
        workoutDB.addWorkout(3,10,"dumbbell curl", "Arms", "Dumbbell", 0);
        workoutDB.addWorkout(4,10,"bench", "Arms", "Barbell", 0);
        workoutDB.addWorkout(5,10,"barbell curl", "Arms", "Barbell", 0);

        //legs example
        workoutDB.addWorkout(3,10,"squat", "Legs", "Dumbbell", 1);
        workoutDB.addWorkout(4,10,"deadlift", "Legs", "Barbell", 1);
        workoutDB.addWorkout(5,10,"box squat", "Legs", "BarbellAndBox", 1);
    
        //back example
        workoutDB.addWorkout(3,10,"pullups", "Back", "Dumbbell", 2);
        workoutDB.addWorkout(4,10,"bent over rows", "Back", "Dumbbell", 2);
        workoutDB.addWorkout(5,10,"push up rows", "Back", "Dumbbell", 2);

        //console.log(workoutDB);

        equipmentDB.addEquipment("Dumbbell");
        equipmentDB.addEquipment("Barbell");
        let lj = new User("lojay", "password1", "easy", "male", "24", "205", "5", "10", ["Arms","Legs","Back"], ["Dumbbell","Barbell"]);
        console.log(lj.generateWeekList());
        //console.log(lj.equipmentList);
        //console.log(lj.generateRandomWorkout("Arms",lj.equipmentList));
    }
}

var myClient = new JAWSclient();
myClient.runMain();