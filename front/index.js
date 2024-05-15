
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

    if(!body.nombre || !body.apellido || !body.dni){
        throw new Error("Flaco, llena los campos");
    }

    fetch("http://localhost:3000/data", { method:'POST', body: JSON.stringify(body), headers }).then((res) => {

    if(!res.ok) throw new Error("Ha ocurrido un error en la respuesta")

    res.text().then((res)=>{
        nameInput.value = ""
        apellidoInput.value = ""
        dniInput.value = ""
    })
    
    }).catch((err) => {
        console.log(err);
    });
});


const getData = () => {
    
    fetch("http://localhost:3000/data", { headers }).then((res) => {

    if(!res.ok) throw new Error("Ha ocurrido un error en la respuesta")

    res.json().then((res)=>{
        if(res.data && res.data.length){
            const container = document.getElementById("container__data__users");
            container.innerHTML = "";

            res.data.forEach(element => {
                const div = document.createElement('div');
                div.innerHTML = element.nombre + ' ' + element.apellido + ' ' + element.dni + ' ' + element.deuda;

                container.appendChild(div)
            });
        }
        
    })
    
    }).catch((err) => {
        console.log(err);
    });
}

document.getElementById("button-reload").addEventListener('click', (event) => {
    getData();
});


getData();