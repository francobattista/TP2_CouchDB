
const nameInput = document.getElementById('input-1');
const apellidoInput = document.getElementById('input-2');
const dniInput = document.getElementById('input-3');

let body = {
};

let headers = {
    'Content-Type': 'application/json'
}

document.getElementById("button-submit").addEventListener('click', (event) => {
    body.nombre = nameInput.value;
    body.apellido = apellidoInput.value;
    body.dni = dniInput.value;

    fetch("http://172.23.0.2:3000/data", { method:'POST', body: JSON.stringify(body), headers }).then((res) => {

    if(!res.ok) throw new Error("Ha ocurrido un error en la respuesta")

    res.text().then((res)=>{
        console.log(res);
    })
    
    }).catch((err) => {
        console.log(err);
    });
});



document.getElementById("button-reload").addEventListener('click', (event) => {

    fetch("http://172.23.0.2:3000/data", { headers }).then((res) => {

    if(!res.ok) throw new Error("Ha ocurrido un error en la respuesta")

    res.text().then((res)=>{
        console.log(res);
    })
    
    }).catch((err) => {
        console.log(err);
    });});
