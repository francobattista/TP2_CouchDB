const PouchDB = require('pouchdb');

/* Crea bases de datos locales */

const localBDRandom = new PouchDB('afipdbrandom'); 
const localBD = new PouchDB('afipdb'); 

/* Crea base de datos remota */

const remoteDB = new PouchDB('http://admin:password@tp2_couch-couchdb-1:5984/afipdbremote')


/* Sincorniza la base de datos local de usuario con la base de datos remota */
localBD.sync(remoteDB, {
  live: true, // mantiene conexión abierta
  retry: true // si se cae la conexión vuelve a intentar conectarse
 }).on('change', function (change) {
  console.log('data change', change)
 }).on('error', function (err) {
  console.log('sync error', err)
 })

/* Sincorniza la base de datos local del random con la base de datos remota */
localBDRandom.sync(remoteDB, {
    live: true, // mantiene conexión abierta
    retry: true // si se cae la conexión vuelve a intentar conectarse
   }).on('change', function (change) {
    console.log('data change', change)
   }).on('error', function (err) {
    console.log('sync error', err)
})