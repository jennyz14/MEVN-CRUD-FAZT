 const express = require('express')
 const router = express.Router() //es un objeto para crear rutas
 const Task = require('../models/Task')


 router.get('/tasksget', async (req, res) => {
     //res.send('API Tasks is goes here')
     const tasks = await Task.find();
     //console.log(tasks)
     res.json(tasks)
 })

 router.post('/taskspost', async (req, res) => {
     const task = new Task(req.body)
     console.log(task)
     await task.save(); //Para guardar en la base de datos
     res.json({
         status: 'Task Saved'
     })
 })

 router.put('/tasksget/:id', async (req, res) => {
     await Task.findByIdAndUpdate(req.params.id, req.body)
     console.log(req.params)
     console.log(req.body)
     res.json({
         status: 'Task Updated'
     })
 })

 router.delete('/tasksget/:id', async (req, res) => {
     await Task.findByIdAndRemove(req.params.id, req.body)
     console.log(req.params)
     console.log(req.body)
     res.json({
         status: 'Task Updated'
     })
 })

 module.exports = router