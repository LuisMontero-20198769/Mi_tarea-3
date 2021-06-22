'use strict';
const btn_guardar = document.querySelector('#boton_guardar');
const nombre = document.querySelector('#nombre');
const apellido = document.querySelector('#apellido');
const telefono = document.querySelector('#telefono');

let validar = () => {
    let inputs_requeridos = document.querySelectorAll('#frm-contacto [required]');
    let error = false;
    for(let i = 0; i < inputs_requeridos.length; i++){
        if(inputs_requeridos[i].velue == ''){
            inputs_requeridos[i].classList.add('input-error');
            error = true;
        }else{
            inputs_requeridos[i].classList.remove('input-error');
        }
    }
    return error;
}
let obtener_datos = () => {
    let error = validar();

    if(error){
        Swal.fire({
          'title':'Sus datos no se pudieron guardar',
          'text': 'Por favor revice que todos los campos esten llenos',
          'icon' : 'warning'

        });
    }else{
        Swal.fire({
            'title':'Proceso finalizado con exito',
            'text': 'Contacto guardado correctamente',
            'icon' : 'success'
  
          });
        
    }
}

btn_guardar.addEventListener("click", (e) => {
    postData("http://www.raydelto.org/agenda.php",{
       nombre: txtNombre.value,
       apellido: txtApellido.value,
       telefono: txtTelefono.value,
    })
    .then((resultados) =>{
       console.log(resultados);
    })
    .catch((err)=>{
       console.log(err);
    });
    obtener_datos();
} );

async function postData(url='', data  = {}){
   const response = await fetch(url, {
       method: "POST",
       mode: "cors",
       headers: {
           "Content-Type": "application/jason",
       },
       body: JSON.stringify(data),
   });
   return response.json();
}

function cargarContactos()
{
  fetch("http://www.raydelto.org/agenda.php")
   .then(function(resultados){
   return resultados.json();
   }).then(function(resultados){
 console.log(resultados);
 var txtNombre = document.getElementById("txtNombre");
 var txtApellido = document.getElementById("txtApellido");
 var txtTelefono = document.getElementById("txtTelefono");
 var contacto = resultados[0];
 txtNombre.innerHTML = contacto.nombre;
 txtApellido.innerHTML = contacto.apellido;
 txtTelefono.innerHTML = contacto.telefono;
});

}


