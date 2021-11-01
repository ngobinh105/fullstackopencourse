import express = require('express')
import calculateBmi from './bmiCalculator'
import calculateExercises from './exerciseCalculator'
const app = express()

app.use(express.json())
app.get('/hello', (_req, res) => {
  res.send('Hello Fullstack')
})
app.get('/bmi', (req, res) => {
  try {
    const height = Number(req.query.height)
    const weight = Number(req.query.weight)
    const bmiResult = calculateBmi(height, weight)
    res.json({ weight, height, bmi: bmiResult })
  } catch (error) {
    res.json({ error: 'malformatted parameters' })
  }
})
app.post('/exercise', (req, res) => {
  try {
    const dailyExercises: Array<number> = req.body.daily_exercises
    const target: number = req.body.target
    res.json(calculateExercises(dailyExercises, target))
  } catch (error) {
    res.json({ error: 'parameters missing' })
  }
})
const PORT = 3003

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
