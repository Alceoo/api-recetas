/*App de recetas....*/

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
        /*Aquí hay un problema, si hubo resultados o no hubo 
        resutados, cómo le podría ha cer? mmmm si sería aquí? jajaja
        no sería en un catch? ahh claro, si hay datosResultadoRecetas
        imprmimo algo y si no lo hay no imprimo nada básicamente...*/    
        
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
        /*Básicamente aquí lo que hicimos fue decir...
        
        Si datosResultadoRecetas.lenght(si el largo de nuestro arreglo es verdadero, mayor a 0 o 
            mejor dicho, si hay algo allí en ese largo de arreglo) entonces coloca un mensaje
            de resultado: que sería el resultado es este.

            : de lo contrario, si no es mayor a 0, coloca "no hay resultados".

        ahora, lo que tendría que hacer sería eliminar el mensaje después de un tiempo...
        pero sería sólo el no, 

        este fallo  ocurriría cuando no se encuentren dos seguidos básicamente, podríamos
        ponerle, si ya existe pues elimínlo, si no existe pss déjalo allí, pero para eso 
        tendríamos que SEPARAR LAS VARIABLES, EN LO QUE SERÍA EL SI HAY, Y EL SI NO HAY...
            headingAlert.textContent = datosResultadoRecetas.length ? 'Su resultado: ', : 'No hay resultados disponibles. 
            esta sería la lógica más corta...
        */    
    

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

            recetaCarBody.append(recetaHeading, recetaButton);

            recetaCard.append(recetaImagen, recetaCarBody);
            contenedorReceta.appendChild(recetaCard);
            resultado.appendChild(contenedorReceta);
            /*Los datos a evaluar son, str meal y el id, que es básicamente el nombre de la receta
            y el id.
            Para el nombre ya teenmos un lado donde colocarlo, sólo tenemso que crear el elemento
            */

        })
    }
    
}/*Creo que aquí las Apis podrían empezar a interactuar entre si, de esta manera podríamos obtener
por ejemplo la información de los platillos de otra api al hacer la consulta.

De igual manera cómo lo hemos estado haciendo, buscando que api tiene esa ifnroamcion, accediendo 
a esa informacion, englobandola o en un objeto o en un arreglo y despues imprimiéndolo en pantalla.
*/
/*Ahora, ocurre un pequeño error...

Esto pasa cuando selecciono una categoría, me manda las recetas y eso.

Pero si vuelvo a seleccionar otra categoría, lo que sucede es que me pone todo lo de la categoría anterior,
esto lo mantiene y me pone lo de la siguiente categoría hasta abajo.

Bien, yo quiero borrar mi resultado anterior...

*/
function eliminarHmtlPrevio(){
    while (resultado.firstChild) {
        resultado.removeChild(resultado.firstChild)
    }
}
document.addEventListener('DOMContentLoaded', iniciarApp);
/**/

