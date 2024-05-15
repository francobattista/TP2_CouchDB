const PouchDB = require('pouchdb');

//Crea DB local con PouchDB para servicio de random
const localBDRandom = new PouchDB('afipdbrandom'); 


const nombres = ["Ana", "Juan", "María", "Luis", "Elena", "Carlos", "Sofía", "Javier", "Laura", "Mateo", "Hernan", "Martin", "Toby", "Franko"];
const apellidos = ["García", "Pérez", "López", "Martínez", "Sánchez", "Rodríguez", "Gómez", "Fernández", "González", "Torres", "Hinojal", "Casas", "Battista", "Andrade", "Rico"];
const dni = String(Math.floor(10000000 + Math.random() * 90000000));

/* Randomizer: Crea datos random y los los inserta en la base de datos local del random */

const insertRandomData = () => {
    try {
        const fecha = new Date();

        console.log("Ejecutando random...");
        localBDRandom.put({
            _id: fecha.toISOString(),
            "type":"user",
            "nombre": nombres[Math.floor(Math.random() * nombres.length)],
            "apellido": apellidos[Math.floor(Math.random() * apellidos.length)],
            "dni": dni,
            "deuda": (Math.random()*10000).toFixed(3)
        })
    
        //Cada veinte segundos inserta data random
        setTimeout(insertRandomData,20000);

    } catch (error) {
        throw error;
    }

}

module.exports = { insertRandomData }