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
        /*Aquí aparece c= y beef, pero lo que nosotros queremos de esto es cambiarle el valor después del igual, 
        ya que esto sería igual al valor de nuestro platillo, y le pondríamos el valor de la categoría en todo 
        caso*/
        console.log(url);
        /*Vemos que se asignó correctamente, ahora lo que tendríamos que hacer es, en base a la categoría,
        buscar la información de los platillos que podríamos usar para amm mantener esos platillos*/
        fetch(url)
            .then((respuesta) => respuesta.json())
            .then((resultado) => mostrarPlatillos(resultado.meals))/*para poder acceder automáticamente al valor
    que engloba los objetos que es (meal) le ponemos la sintaxis de punto(.) y el nombre que nos arroja esa
    macrocategoría que es meal*/


            /*No tengo idea de porque, pero enserio, esto ya está filtrando lo que nosotros tendríamos que 
    filtrar..., o sea, si colocamos beef, nos va a traer las 42 recetas de beef, si colocamos chicken, nos va
    a traer las 35 recetas que hay de beef..., sólo tendría que pasar el argumento que guarda los datos de resultado
    a una función que tome un valor como parámetro y hacer destructuring sobre ese resultado para que me los 
    muestre....*/
    };
    function mostrarPlatillos(datosResultadoRecetas = []){/*Ahora que queremos iterar sobre ellos para mostrar los 
    resultados lo que tenemos que hacer es igualar los datos de los objetos a un arreglo...*/
        console.log(datosResultadoRecetas);
        //Ahora a iterar sobre datosResultadoRecetas
        datosResultadoRecetas.forEach((e) => {
            /*Ahora yo quiero extraer la imagen y el nombre*/
          const dondePoner = document.querySelector('#resultado'); 
            const {strMeal, strMealThumb,idMeal} = e; 
            console.log(strMeal, strMealThumb, idMeal);
            /*Ahora ya teniendo esto lo que quiero hacer es crear un elemento por cada valor y colocarlos en el 
            html bajo el select de categorias*/

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

            console.log(recetaImagen);
            recetaCard.append(recetaImagen, recetaCarBody);
            contenedorReceta.appendChild(recetaCard);
            dondePoner.appendChild(contenedorReceta);
        })
    }
    /*Ahora, lo que estoy tratando de mostrar es amm los datos, pero no sé cómo hacer que en base a la categoría
    me muestre los datos que quiero iterando en los objetos, quizás debamos amm convertirlo a un arreglo o algo
    medianamente parecido.*/
/**/
}

document.addEventListener('DOMContentLoaded', iniciarApp);
/**/

