import * as dotenv from 'dotenv';
dotenv.config();
import axios from 'axios';

const ExerciseClient = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1/exercises?',
  headers: {
    'X-Api-Key':
      process.env.API_KEY || 'Pk3n4+PNjhuRoe2dwbB3JA==kYd4pMq5v5CRDjjU',
  },
});

export async function getWorkoutByMuscle(muscle) {
  const response = await ExerciseClient.get('', {
    params: {
      muscle: muscle,
    },
  });
  const data = await response.data;
  return data;
}

export async function getWorkoutByDifficulty(intensity) {
  const response = await ExerciseClient.get('', {
    params: {
      difficulty: intensity,
    },
  });
  const data = await response.data;
  return data;
}

export async function getWorkoutByMuscleAndDifficulty(
  muscle,
  intensity,
  offset = 0
) {
  const response = await ExerciseClient.get('', {
    params: {
      muscle: muscle,
      difficulty: intensity,
      offset: offset,
    },
  });
  const data = await response.data;
  return data;
}
