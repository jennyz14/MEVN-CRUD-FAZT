 const express = require('express')
 const router = express.Router() //es un objeto para crear rutas
 const Task = require('../models/Task')

// set up rate limiter: maximum of five requests per minute
let RateLimit = require('express-rate-limit');
let limiter = RateLimit({
    windowMs: 1*60*1000, // 1 minute
    max: 5
  });
router.use(limiter);

 router.get('/tasks', async (req, res) => {
    
     //res.send('API Tasks is goes here')
     const tasks = await Task.find();
     //console.log(tasks)
     res.json(tasks)
 })

 router.get('/tasks/:id', async (req, res) => {
    //nuevo
    let path = req.params.path;
    if (isValidPath(path))
      res.sendFile(path);
     const tasks = await Task.findById(req.params.id);
     res.json(tasks)
 })

 router.post('/tasks', async (req, res) => {
     const task = new Task(req.body)
     console.log(task)
     await task.save(); //Para guardar en la base de datos
     res.json({
         status: 'Task Saved'
     })
 })

 router.put('/tasks/:id', async (req, res) => {
     await Task.findByIdAndUpdate(req.params.id, req.body)
     console.log(req.params)
     console.log(req.body)
     res.json({
         status: 'Task Updated'
     })
 })

 router.delete('/tasks/:id', async (req, res) => {
     await Task.findByIdAndRemove(req.params.id)
     console.log(req.params)
     console.log(req.body)
     res.json({
         status: 'Task Deleted'
     })
 })

 module.exports = router