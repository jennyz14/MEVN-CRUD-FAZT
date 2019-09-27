const express = require('express')
const morgan = require('morgan')
const mongoose = require('mongoose')

const app = express()
const uri = 'mongodb://localhost/mevn-fazt'
const options = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};
mongoose.connect(uri, options)
    .then(db => console.log("BD esta conectado"))
    .catch(err => console.error(err))

//Settings
//Tome el puerto que es ofreciendo el SO, de otro lado sino hay asignare el puerto 3000
app.set('port', process.env.PORT || 3000)

//Middlewares; tambien son funciones
app.use(morgan('dev'))
app.use(express.json()) // es igual que bodyParse

//Routes
app.use('/api', require('./routes/tasks.js'))

//Static files
//console.log(__dirname + '/public')
app.use(express.static(__dirname + '/public'))
//Servidor esta escuchando
app.listen(app.get('port'), () => {
    console.log("Server on port: ", app.get('port'))
})