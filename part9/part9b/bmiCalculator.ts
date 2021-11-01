const calculateBmi = (height: number, weight: number): string => {
  if (!height || !weight) {
    throw new Error('Please input height & weight')
  }
  const bmi = weight / (height / 100) ** 2
  if (bmi < 18.5) {
    return 'Underweight (Unhealthy)'
  }
  if (bmi >= 18.5 && bmi < 22.9) {
    return 'Normal (Healthy)'
  }
  if (bmi >= 23.0 && bmi < 24.9) {
    return 'Overweight I (At risk)'
  }
  if (bmi >= 25.0 && bmi < 29.9) {
    return 'Overweight II (Moderately obese)'
  }
  if (bmi >= 30) {
    return 'Overweight III (Severely obese)'
  }
  return ''
}
try {
  const height = Number(process.argv[2])
  const weight = Number(process.argv[3])
  console.log(calculateBmi(height, weight))
} catch (error) {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  console.log('Error found', error.message)
}

export default calculateBmi
