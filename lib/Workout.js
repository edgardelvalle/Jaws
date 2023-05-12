class Workout {
  constructor(
    name,
    sets,
    reps,
    muscleGroup,
    equipment,
    difficulty,
    instruction = ''
  ) {
    this.name = name;
    this.sets = sets;
    this.reps = reps;
    this.muscleGroup = muscleGroup;
    this.equipment = equipment;
    this.difficulty = difficulty;
    this.instruction = instruction;
  }
}
