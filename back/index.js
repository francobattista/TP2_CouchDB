const express = require('express')
const cors = require('cors')
const PouchDB = require('pouchdb');


const localBD = new PouchDB('afipDB'); 


const app = express()

app.use(cors())

app.get('/data', (req, res) => {
    res.send('Hello World, desde el get')
})

app.post('/data', (req, res) => {

    //let nuevoDocumento={_id:'19',nombre:'Julian',apellido:'Alvarez',edad:23};

    res.send('Hello World, desde el post')
})

app.options('*', (req,res) => {
    res.send('Options solved')
})

app.listen(3000, () => {
    console.log("Server listening at 3000");
})