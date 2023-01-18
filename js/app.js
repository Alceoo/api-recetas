/*App de recetas....*/

function iniciarApp(){//Al inciar la app quiero traerme las categorías para el select
    obtenerCategorias();
    console.log('iniciando app');
    
    const selectCategorias = document.querySelector('#categorias');

    function obtenerCategorias(){
        console.log('obteniendo categorias');
        //CONECTANDO DATOS...
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
            .then((respuesta) => respuesta.json())                
            .then((resultado) => mostrarCategorias(resultado.categories));
        
        function mostrarCategorias(categorias = []){
            
            /*Aquí tengo que hacer destructuring sobre los objetos o el objeto en todo caso con
            las propiedades que quiero sacar...*/
        
            /*O sea, me acaba de decir que en un montículo de objetos, no sólo se puede acceder
            a las propiedades de estos con destructuring, sino que también se puede acceder a ellos
            con la sintaxis de punto desde la funcion...

            Y también me permite igualar mis datos ya extraídos de su arreglo de categorias a
            un arreglo común, de este modo ya podemos iterar, ya que categorias ya es un 
            arreglo...
            Y ahora si, a hacer destructuring
            */
            categorias.forEach((ObjetosCategorias) => {
                console.log(ObjetosCategorias);
                const {idCategory, strCategory, strCategoryDescription, strCategoryThumb} = ObjetosCategorias; 
                console.log(idCategory, strCategory, strCategoryDescription, strCategoryThumb);
                /**Pues ahora, esto lo quiero meter en los selects de categorias, para ello en primera necesito
                 seleccionar el elemento...*/
                /*Sería crear los options si no me equivoco através de un inner html y después meterlos
                en el select, ya que los options no tienen entrada dir ecta...*/
                const option = document.createElement('option');

                console.log(option);
                /*Que por cada iteracion me cree un option, con un value de pss lo que queremos
                quen este caso sería amm un strcategory */
                option.value = `${strCategory}`;/*El value del option lo creo para después leer
                por este mismo value*/
                option.textContent = `${strCategory}`;
                /*Y que me lo coloque en la categoria de select*/
                selectCategorias.appendChild(option);
            });  

        }
    };


}

document.addEventListener('DOMContentLoaded', iniciarApp);
