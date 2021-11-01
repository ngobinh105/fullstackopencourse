interface ReturnObj {
  periodLength: number
  trainingDays: number
  success: boolean
  rating: number
  ratingDescription: string
  target: number
  average: number
}
const calculateExercises = (args: Array<number>, target: number): ReturnObj => {
  if (args.length < 1) {
    throw new Error('Please input daily exercises')
  }
  if (!target) {
    throw new Error('Please input target')
  }
  // if (rating === 0 || rating > 3) {
  //   throw new Error('please rate from 1-3')
  // }
  let rating = 0
  let ratingDescription = ''
  const average = args.reduce((acc, cur) => acc + cur) / args.length
  const periodLength = args.length
  const trainingDays = args.filter((item) => item !== 0).length
  if (average > target) {
    rating = 3
  }
  if (average < target && average > target / 2) {
    rating = 2
  }
  if (average < target / 2) {
    rating = 1
  }
  if (rating === 1) {
    ratingDescription = 'need extra efforts'
  }
  if (rating === 2) {
    ratingDescription = 'not too bad but could be better'
  }
  if (rating === 3) {
    ratingDescription = 'good effort'
  }

  return {
    periodLength,
    trainingDays,
    success: average > target,
    rating,
    ratingDescription,
    target,
    average,
  }
}
try {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_, __, ___, ...rest] = process.argv
  const dailyExercises: Array<number> = rest.map((n) => Number(n))
  const rating = Number(process.argv[2])

  console.log(calculateExercises(dailyExercises, rating))
} catch (e) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error, something bad happened, message: ', e.message)
}

export default calculateExercises
