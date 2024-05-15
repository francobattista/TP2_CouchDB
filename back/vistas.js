const PouchDB = require('pouchdb');

/* Recupera base de datos local de usuario */
const localdb = PouchDB('afipdb');


/* Crea documento de diseño para crear la vista con el map */
const designDoc = {
    _id: '_design/view',
    views: {
      by_type: {
        map: function (doc) {
          if (doc.type) { //El parametro tipo es la clave de busqueda
            emit(doc.type, doc);
          }
        }.toString()
      }
    }
  };
  
  /* GUarda el documento en la base de datos local de usuario */
  localdb.put(designDoc).then(() => {
    console.log('Documento de diseño creado');
  }).catch((err) => {
    console.error('Error al crear el documento de diseño:', err);
  });

  module.exports = { designDoc }