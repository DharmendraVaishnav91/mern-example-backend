const router = require('express').Router()
let Exercise = require('../models/exercise.model')

router.route('/').get((req, res) => {
    Exercise.find()
        .then((exercises) => {
            res.json(exercises)
        })
        .catch((error) => {
            res.status(400).json('Error: ' + error)
        })

})

router.route('/:id').get((req, res) => {
    Exercise.findById(req.params.id)
        .then((exercise) => {
            res.json(exercise)
        })
        .catch((error) => {
            res.status(400).json('Error: ' + error)
        })

})

router.route('/:id').put((req, res) => {
    Exercise.findById(req.params.id)
        .then((exercise) => {

            exercise.username = req.body.username
            exercise.description = req.body.description
            exercise.date = Date.parse(req.body.date)
            exercise.duration = Number(req.body.duration)
            return exercise.save()
        })
        .then(() => {
            res.json(`Updated exercise for id ${req.params.id}`)
        })
        .catch((error) => {
            res.status(400).json('Error: ' + error)
        })

})

router.route('/:id').delete((req, res) => {
    Exercise.findByIdAndDelete(req.params.id)
        .then(() => {
            res.json(`Exercise deleted having id = ${req.params.id}`)
        })
        .catch((error) => {
            res.status(400).json('Error: ' + error)
        })

})

router.route('/add').post((req, res) => {
    const { username, description } = req.body
    const duration = Number(req.body.duration)
    const date = Date.parse(req.body.date)
    const newExercise = new Exercise({ username, description, duration, date })

    newExercise.save()
        .then(() => {
            res.json('exercise added successfully')
        })
        .catch((error) => {
            res.status(400).json('Error: ' + error)
        })
})

module.exports = router