/* Variables globales */

let initCap = document.querySelector('#inicial');
let aport = document.querySelector('#aportacion');
let duracion = document.querySelector('#duracion');
let tasa = document.querySelector('#tasa');
let calculo = document.getElementById('calcular');
let borrar = document.getElementById('borrar');

let ultIni = null;
let ultDurat = null;
let ultInt = null;

/* Variables cálculo del interés compuesto */

initCap.addEventListener('keyup', function() {
    // Var locales
    let inicial;
    
    inicial = document.querySelector('#inicial').value;
    ultIni = parseInt(inicial);
});

/*
aport.addEventListener('keyup', function() {
    // Var locales
    let aportacion;

    aportacion = document.querySelector('#aportacion').value;  
});
*/

duracion.addEventListener('keyup', function() {
    // Var locales
    let duracion;

    duracion = document.querySelector('#duracion').value;
    ultDurat = parseInt(duracion);    
});

tasa.addEventListener('keyup', function() {
    // Var locales
    let tasaInt;

    tasaInt = document.querySelector('#tasa').value;
    ultInt = parseInt(tasaInt);   
});

/* Cálculo del interés compuesto */
let calculated = false;
let resultado = null;
let isElementCreated = false;
let nuevoDiv = null;
let isDivCreated = false;

function calcularCapitalFinal(ultIni, ultDurat, ultInt) {

    let capFinal = null;
    let prod = null;

    // Primera vez que se ejecuta la función (se crea el div)
    if (calculated == false) {
        prod = Math.pow((1+(ultInt/100)), ultDurat);
        capFinal = (ultIni * prod);
    
        nuevoDiv = document.createElement('DIV');
        nuevoDiv.textContent = `Capital al final de la inversión: ${parseFloat(capFinal.toFixed(2))} €`;

        isDivCreated = true;

        document.querySelector('.resultado').appendChild(nuevoDiv);
    }

    // Segunda o posteriores veces que se ejecuta la función (solo se modifica el textContent del div)
    if (calculated == true) {
        prod = Math.pow((1+(ultInt/100)), ultDurat);
        capFinal = (ultIni * prod);

        nuevoDiv = document.createElement('DIV');
        nuevoDiv.textContent = `Capital al final de la inversión: ${parseFloat(capFinal.toFixed(2))} €`;
        document.querySelector('.resultado').appendChild(nuevoDiv);

        isDivCreated = true;
    }
        
    
};

/* Función de retraso en el cálculo del resultado */
function esfuerzoMatematico() {

    if (!isElementCreated) {

        const pensandoDiv = document.createElement('DIV');
        pensandoDiv.textContent = 'Pensando... Cuántos números...';
        document.querySelector('.pensando').appendChild(pensandoDiv);

        isElementCreated = true;

        setTimeout( () => {
            document.querySelector('.pensando').removeChild(pensandoDiv);
            resultado = calcularCapitalFinal(ultIni, ultDurat, ultInt);

            calculated = true;
            isElementCreated = false;
            borrar.disabled = false;
        }, 2000);

    }
    
};

/* Botón de Calcular */ 
calculo.addEventListener('click', function calc() {
    borrar.disabled = true;

    // Comprobar si los campos son válidos
    if (!(ultIni > 0) || !(ultDurat > 0) || !(ultInt > 0)) {
        // Comprobar si el elemento está activo en el DOM
        if (!isElementCreated) {
            const errorDiv = document.createElement('DIV');
            errorDiv.textContent = 'Falta información o algún campo es erróneo';
            document.querySelector('.pensando').appendChild(errorDiv);

            isElementCreated = true;
            // Remove the alert after 2 sec
            setTimeout( () => {
                errorDiv.remove();
                isElementCreated = false;
                borrar.disabled = false;
            }, 2000);

            nuevoDiv = null;
            return;
        }
        
    } 
    
    if (ultIni != null && ultDurat != null && ultInt != null) {

        if (isDivCreated == true) {
            document.querySelector('.resultado').removeChild(nuevoDiv);

            isDivCreated = false;
        };

        esfuerzoMatematico();
        
    }

});

/* Botón de Borrar */
borrar.addEventListener("click", reiniciar, false); 

function reiniciar() {
    document.querySelector('#inicial').value = null;
    document.querySelector('#aportacion').value = null;
    document.querySelector('#duracion').value = null;
    document.querySelector('#tasa').value = null;

    ultIni = null;
    ultDurat = null;
    ultInt = null;

    if (isDivCreated == true) {
        document.querySelector('.resultado').removeChild(nuevoDiv);
        nuevoDiv = null;

    }

    if (isDivCreated = false) {
        return;
    }

    isDivCreated = false;
};