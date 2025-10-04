const statsList = document.getElementById("stats");
const ruido = document.getElementById("ruido");

//Para las imagenes
const sprite1 = document.getElementById("sprite1")
const sprite2 = document.getElementById("sprite2")

//Input
const input = document.getElementById("pokemonInput");

//boton
const btn = document.getElementById("buscarBtn");

//Para el oculto
const estadisticasDiv = document.getElementById("estadisticas");
const spriteDiv = document.getElementById("sprite");
const sonidoDiv = document.getElementById("sonido");

//Cuando se produce una busqueda no valida despues de una exitosa se borra aquí
const limpiar = () => {
  statsList.innerHTML = "";
  sprite1.src = "";
  sprite2.src = "";
  ruido.src = "";
};

// Volver a ocultar las secciones
estadisticasDiv.classList.add("oculto");
spriteDiv.classList.add("oculto");
sonidoDiv.classList.add("oculto");

btn.addEventListener("click", () => {
  const pokemon = input.value.trim().toLowerCase();
  limpiar();
  fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    .then((response) => {
        //Para .oculto
        if(!response.ok){
            throw new Error("Pokemon no encontrado");
        }
        return response.json();
    })
    .then((data) => {
      const stats = data.stats;
      const cries = data.cries.latest;

      //Estadisticas
      stats.forEach((stat) => {
        const statLi = document.createElement("li");
        statLi.textContent = `${stat.stat.name}: ${stat.base_stat}`;
        statsList.appendChild(statLi);
      });

      //Sprites
      imagen_frontal = data.sprites.front_default;
      shiny = data.sprites.front_shiny;
      sprite1.src = imagen_frontal;
      sprite2.src = shiny;

      //Sonido
      ruido.src = cries;

      //Quitar .oculto para mostrar datos
      estadisticasDiv.classList.remove("oculto")
      spriteDiv.classList.remove("oculto")
      sonido.classList.remove("oculto")

    })
    .catch((error) => {
        console.error("Error al obtener los datos:", error);

        //limpiar y ocultar
        limpiar();

        //Popup de que el pokemon no se encontro
        alert("El pokemon introducido no existe, intentelo de nuevo");
    });
});
 