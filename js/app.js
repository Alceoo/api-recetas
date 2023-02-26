/*App de recetas....*/
/*llamar y sacar el modal de boostrap, identificar a que le estoy dando 
click y el evento del elemento flotante...*/
function iniciarApp(){//Al inciar la app quiero traerme las categorías para el select

    const selectCategorias = document.querySelector('#categorias');
    selectCategorias.addEventListener('change', seleccionarCategorias); 
    /*La mayoría de veces el evento para un select es un change, después de ese se leen sus valores.*/

    obtenerCategorias();
    //console.log('iniciando app');
    
    function obtenerCategorias(){
        console.log('obteniendo categorias');
        //CONECTANDO DATOS...
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
            .then((respuesta) => respuesta.json())                
            .then((resultado) => mostrarCategorias(resultado.categories));
        
    };
    function mostrarCategorias(categorias = []){
           
        categorias.forEach((ObjetosCategorias) => {
            const {strCategory} = ObjetosCategorias; 
            //console.log(strCategory);
            // console.log(idCategory, strCategory, strCategoryDescription, strCategoryThumb);
            const option = document.createElement('option');
            //  console.log(option);
            option.value = `${strCategory}`;
            option.textContent = `${strCategory}`;
            selectCategorias.appendChild(option);
        });  

    }
    function seleccionarCategorias(e){/*Se le pone e para recuperar el evento, y de esta manera yo puedo
    recuperar el valor seleccionado por el usuario... */

        console.log(e.target.value);
        const categorias = e.target.value; 
        /*Y lo que hacemos es mandar llamar los datos que seleccionamos básicamnete, para ello vamos a necesitar
        el segundo amm json por así decirlo....*/
        const url = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${categorias}`;
        //De esta manera las categorías serán dinámicas, se irá trayendo los platillos en base a esa categoría
        console.log(url);
        fetch(url)
            .then((respuesta) => respuesta.json())
            .then((resultado) => mostrarPlatillos(resultado.meals))
    };
    function mostrarPlatillos(datosResultadoRecetas = []){/*Ahora que queremos iterar sobre ellos para mostrar los 
        resultados lo que tenemos que hacer es igualar los datos de los objetos a un arreglo...*/
        eliminarHmtlPrevio();  
        const headingAlert = document.createElement('h4');
        headingAlert.classList.add('text-center', 'text-block', 'my-5');
        if(datosResultadoRecetas.length > 0){
            headingAlert.textContent = `Su resultado es: `;
            setTimeout(() => {
                headingAlert.remove()
            }, 3000);
        }else {
            headingAlert.textContent = `No hay recetas disponibles...`;
            setTimeout(() => {
                headingAlert.remove();      
            }, 3000);
        };
        resultado.appendChild(headingAlert);
     
        console.log(datosResultadoRecetas);
        //Ahora a iterar sobre datosResultadoRecetas
        datosResultadoRecetas.forEach((e) => {
            /*Ahora yo quiero extraer la imagen y el nombre*/
            const resultado = document.querySelector('#resultado'); 
            const {strMeal, strMealThumb,idMeal} = e; 
            console.log(strMeal, strMealThumb, idMeal);
             console.log(e);
            const contenedorReceta = document.createElement('DIV');
            contenedorReceta.classList.add('col-md-4');

            const recetaCard = document.createElement('DIV');
            recetaCard.classList.add('card', 'mb-4');

            const recetaImagen = document.createElement('IMG');
            recetaCard.classList.add('card-img-top');
            recetaImagen.alt = `Imagen de la receta: ${strMeal}`;
            recetaImagen.src = strMealThumb;

            const recetaCarBody = document.createElement('DIV');
            recetaCarBody.classList.add('card-body');

            const recetaHeading = document.createElement('h3');
            recetaHeading.classList.add('card-title', 'mb-3');
            recetaHeading.textContent = `${strMeal}`;

            const recetaButton = document.createElement('button');
            recetaButton.classList.add('btn', 'btn-danger', 'w-100');
            recetaButton.textContent = 'Ver receta'; 

        /*Aquí tenemos que identificar de alguna manera el boton al que le 
        estamos dando click, disparar un evento y mostrar el modal...*/
            //recetaButton.dataset.bsTarget = "#modal";
            /*Así es cómo se conecta con boostrap, tendrá si amm data-set
            o bien, identificador cómo modal*/
            //recetaButton.dataset.bsToggle = "modal";
            /*De esta manera llamamos el modal, con esto ya colocamos el buton
            con los valores que le hemos puesto.*/

        /*Ahora, cuando yo presione el btn de una receta yo quiero traerme la 
        información de la receta, para ello tenemos que consultar la API y traerme 
        la información.
        
        Así que lo que tengo que hacer es que UNA VEZ QUE PRESIONEMOS, MANDE LLAMAR 
        otra función que consulte la api, para que se traiga esa receta en específico.
        , veámos cómo hacerlo...

        Ponemos en onclick, porque es un elemento flotante por así decirlo, 
        ya que la primera vez que carga el html no existe, sino que se crea 
        después de hacer algo, por lo que un event listener no nos serviría para
        absolutamente nada...*/
            
            recetaButton.onclick = function(){
                seleccionarReceta(idMeal);/*Y aquí a la receta le vamos a colocar el 

                idMeal de cada receta, por lo que ya le estaríamos colocando el id al 
                btn de esta manera al presionar el BOTON.*/
                /*NOTA: SI NO LE PONEMOS CÓMO FUNCTION NOS VA A MARCAR ERRORES
                , SI LO DEJAMOS CÓMO CALLBACK ESTE VA A ESPERAR A QUE OCURRA EL
                EVENTO DE ONCLICK..*/
            }

            recetaCarBody.append(recetaHeading, recetaButton);

            recetaCard.append(recetaImagen, recetaCarBody);
            contenedorReceta.appendChild(recetaCard);
            resultado.appendChild(contenedorReceta);
          
        })
    }
    
}

function seleccionarReceta(idRecetaBtn){/*Ahora, mi 3er api, el valor que tiene
al final es el id, por lo que si queremos llamar la api y traernos la info
de esa receta...*/
    console.log(idRecetaBtn);

    const url = `https://themealdb.com/api/json/v1/1/lookup.php?i=${idRecetaBtn}`;
    /*Aquí en el espacio de id, lo borramos y le colocamos el valor del id
    que ya rescaté, que es idRecetaBtn*/
    console.log(url);
}
function eliminarHmtlPrevio(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}
document.addEventListener('DOMContentLoaded', iniciarApp);
