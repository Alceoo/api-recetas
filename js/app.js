/*App de recetas....
La finalidad de la construcción de la app de recetas es que 
nosotros podamos prácticar más a fondo las apis  y json.

Claramente con promesas y programación funcional...


Este proyecto estará hecho con un frameworkq ue se llama boosttrap
y 3 apis distintas de la misma página...

Tenemos uno para obtener todas las categorias
Tenemos uno, para obtener todas las recetas de una categoría
Y tendremos uno para obtener toda la informacion de un platillo

VEREMOS CÓMO CONECTAR ESTAS 3, estaremos haciendo consultas cómo
sea necesario, primero obtendremos las categorías, mostrarlas en el
select y según yo seleccione se muestren los platillos y después 
accedemos a cada uno de ellos...*/

/*Podemos seleccionar la categoría en el select.
Las categorias las obtendremos de una api, pero al iniciar la app yo ya tengo mis 
valores de los selects, esos se traen desde una api..*/

function iniciarApp(){//Al inciar la app quiero traerme las categorías para el select
    obtenerCategorias();
    console.log('iniciando app');
    
    function obtenerCategorias(){
        console.log('obteniendo categorias');
        //CONECTANDO DATOS...
        const url = 'https://www.themealdb.com/api/json/v1/1/categories.php';

        fetch(url)
            .then((respuesta) => respuesta.json())                
            .then((datos) => mostrarCategorias(datos))
          /*Esta parte ya es de cajón básicamente....
          Ahora, si queremos amm hacer algo con esos datos, lo que tenemos que hacer
          es extraerlos de datos...

          Esto lo podemos hacer con destructuring, o div destructuring si queremos
          acceder a elementos que están dentro de otros objetos básicamente...
          */
        
        function mostrarCategorias(datos){
            console.log(datos);

       }
    };

    /**/

}

document.addEventListener('DOMContentLoaded', iniciarApp);

/*Quedé en que iba a anotar los puntos que no entendiera, el primer punto fue lo de 
iniciar el docuemento de esa manera.

El segundo punto que no entiendo y es nuevo para mi, es que le pasemos un 
método a una función con un valor de parámetro para la api...
Y a su vez, es nuevo para mi, poder asignar esos valores a un arreglo desde el 
mismo parámetro de un arreglo...
Tengo que anotar en el cuaderno los pasos. si se puede con código pegado, tengo que 
habilitar la extensión que deja en blanco el editor claramente...
paso numero 3 completado, editor de texto en color blanco para la impresión de el ejemplo
y los comentarios en el cuaderno, listo...
*/


