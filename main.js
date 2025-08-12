"use strict"

 // Elementos
const kittenList = document.querySelector(".js-list");
const inputDesc = document.querySelector(".input-description");
const inputRace = document.querySelector(".input-race");
const searchBtn = document.querySelector(".button");
const toggleFormBtn = document.querySelector(".btn-add");
const formSection = document.querySelector(".form_section");
const addKittenBtn = formSection.querySelector(".js-add-btn");


// Datos iniciales
let kittens = JSON.parse(localStorage.getItem("kittens")) || [ // Si localstorage existe, lo usa, si no usa el array || (OR) ahorra usar un IF
  {
    name: "Anastacio",
    race: "Siamés",
    desc: "Porte elegante y ojos azules intensos.",
    image: "https://dev.adalab.es/gato-siames.webp",
  },
  {
    name: "Fiona",
    race: "British Shorthair",
    desc: "Muy tranquila y adorable.",
    image: "https://dev.adalab.es/gato-british.webp",  //Buscar imagen yo
  },
  {
    name: "Cielo",
    race: "Maine Coon",
    desc: "Grande y suave, como una nube.",
    image: "https://dev.adalab.es/gato-mainecoon.webp",  //Buscar imagen yo
  },
];

// Renderizar gatos
function renderKittens(data) {
  kittenList.innerHTML = ""; // Limpiar antes de renderizar

  data.forEach((kitten) => {
    kittenList.innerHTML = kittenList.innerHTML + `
      <li class="card">
        <article>
          <img class="card_img" src="${kitten.image}" alt="${kitten.race}" />
          <h3 class="card_title">${kitten.race}</h3>
          <p class="card_description">${kitten.desc}</p>
        </article>
      </li>`;
  });
}

// Buscar
function handleSearch() {
  const descFilter = inputDesc.value.toLowerCase();
  const raceFilter = inputRace.value.toLowerCase();

  const filtered = kittens.filter(
    (kitten) =>
      kitten.desc.toLowerCase().includes(descFilter) &&
      kitten.race.toLowerCase().includes(raceFilter)
  );

  renderKittens(filtered);
}

searchBtn.addEventListener("click", handleSearch);

// Mostrar formulario
toggleFormBtn.addEventListener("click", () => {
  formSection.classList.toggle("hidden");
  console.log(formSection.classList)
});

// Añadir nuevo gatito
addKittenBtn.addEventListener("click", () => {
  const name = formSection.querySelector(".js-name").value.trim(); // trim quita espacios en blanco antes y despues del value
  const race = formSection.querySelector(".js-race").value.trim();
  const desc = formSection.querySelector(".js-desc").value.trim();
  const image = formSection.querySelector(".js-img").value.trim();

  if (name && race && desc && image) {
    const newKitten = { name, race, desc, image }; // crea un newKitten con los 4 valores
    kittens.push(newKitten); // añade el newKitten al final del array
    localStorage.setItem("kittens", JSON.stringify(kittens));  // se añade la lista de kittens al localStorage
    renderKittens(kittens); // renderiza los gatos con la lista actualizada
    formSection.classList.add("hidden"); // oculta el formulario (añadiendo la clase hidden)
    formSection.querySelectorAll("input").forEach((i) => (i.value = ""));  // pone en blanco cada input del formulario
  }
});


renderKittens(kittens); // llama a la función renderKittens sobre la lista kittens

const last = kittens.length -1; // calculo la ultima posicion del array
console.log(kittens[last]); // imprimo por consola el ultimo gato