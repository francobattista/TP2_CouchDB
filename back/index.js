const express = require('express')
const cors = require('cors')
const PouchDB = require('pouchdb');

/* Define las vistas para usarse luego */
const initView = require('./vistas')

/* Crea randomizer */
const { insertRandomData } = require('./random')

/* Inicia sincronizador */

const synchDb = require('./synchdb')

/* Crea o recupera DB local con PouchDB para usuarios */

const localBD = new PouchDB('afipdb'); 

/* Preparacion del servidor express */
const app = express()
app.use(cors())
app.use(express.json())

/* Busca la vista creada en archivo vistas.js, buscando los que tengan key:user */
const getView = () => {

    return new Promise((resolve, reject) =>{
        localBD.query('view/by_type', {
            key: 'user', 
            include_docs: true
        }).then((result) => {
            resolve(result.rows.map(row => row.doc));
        }).catch((err) => {
            reject(err);
        });
    })
}


/* Metodo GET: utiliza la vista para buscar todos los documentos que haya subido el usuario o el random */

app.get('/data', async (req, res) => {
    try {
        const data = await getView();
        res.status(200).send({message: 'Búsqueda correcta', data})
    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Ha ocurrido un error', error: error.error})
    }
    

})


/* Metodo POST: Crea un nuevo documento y lo ingresa a la base de datos local del usuario */
app.post('/data', (req, res) => {
    try {

        const {apellido, nombre, dni} = req.body;

        const fecha = new Date();

        let nuevoDocumento = {
            _id: fecha.toISOString(),
            type:'user',
            nombre: nombre,
            apellido: apellido,
            dni: dni,
            deuda: (Math.random()*10000).toFixed(3)
        };
    
        localBD.put(nuevoDocumento);
    
        res.status(200).send({message: 'El documento ha sido insertado con éxito', nuevoDocumento})    

    } catch (error) {
        console.log(error);
        res.status(500).send({message:'Ha ocurrido un error', error: error.error})
    }

    
})

/* Saltea options */
app.options('*', (req,res) => {
    res.send('Options salteado')
})


/* Inicio del servidor */
app.listen(3000, () => {
    try {

        console.log("Server listening at 3000");
        //Inicia random
        insertRandomData();

    } catch (error) {
        console.error(error)
    }


})