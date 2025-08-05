"use strict"

console.log("Go");



// const kittenList = document.querySelector(".js-list");

// /* Agregar el código del li desde HTMl 
// Repetir este proceso por cada gatito */
// const kittenOne = `<li class="card">
// <article>
//   <img
//     class="card_img"
//     src="https://dev.adalab.es/gato-siames.webp"
//     alt="gatito"
//   />
//   <h3 class="card_title">Anastacio</h3>
//   <h4 class="card_race">Siamés</h4>
//   <p class="card_description">
//             Porte elegante, su patrón de color tan característico y sus ojos
//             de un azul intenso, pero su historia se remonta a Asía al menos
//             hace 500 años, donde tuvo su origen muy posiblemente.
//    </p>
// </article>
// </li>`;

// kittenList.innerHTML = kittenOne;

// console.log(kittenOne);

 // Elementos
const kittenList = document.querySelector(".js-list");
const inputDesc = document.querySelector(".input-description");
const inputRace = document.querySelector(".input-race");
const btnSearch = document.querySelector(".button");
const toggleFormBtn = document.querySelector(".btn-add");

// Crear y mostrar formulario
const formSection = document.createElement("section");
formSection.classList.add("form-section", "hidden");
formSection.innerHTML = `
  <input type="text" class="js-name" placeholder="Nombre" />
  <input type="text" class="js-race" placeholder="Raza" />
  <input type="text" class="js-desc" placeholder="Descripción" />
  <input type="url" class="js-img" placeholder="URL de la imagen" />
  <button class="js-add-btn">Añadir</button>
`;
document.querySelector("main").prepend(formSection);

// Datos iniciales
let kittens = JSON.parse(localStorage.getItem("kittens")) || [
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
    image: "https://dev.adalab.es/gato-british.webp",
  },
  {
    name: "Cielo",
    race: "Maine Coon",
    desc: "Grande y suave, como una nube.",
    image: "https://dev.adalab.es/gato-mainecoon.webp",
  },
];

// Renderizar gatos
function renderKittens(data) {
  kittenList.innerHTML = data
    .map(
      (kitten) => `
    <li class="card">
      <article>
        <img class="card_img" src="kitten.image" alt="{kitten.name}" />
        <h3 class="card_title">kitten.name</h3>
        <h4 class="card_race">{kitten.race}</h4>
        <p class="card_description">kitten.desc</p>
      </article>
    </li>`
       )
    .join("");
}

renderKittens(kittens);

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

btnSearch.addEventListener("click", handleSearch);

// Mostrar formulario
toggleFormBtn.addEventListener("click", () => {
  formSection.classList.toggle("hidden");
});

// Añadir nuevo gatito
formSection.querySelector(".js-add-btn").addEventListener("click", () => {
  const name = formSection.querySelector(".js-name").value.trim();
  const race = formSection.querySelector(".js-race").value.trim();
  const desc = formSection.querySelector(".js-desc").value.trim();
  const image = formSection.querySelector(".js-img").value.trim();

  if (name && race && desc && image) {
    const newKitten = { name, race, desc, image };
    kittens.push(newKitten);
    localStorage.setItem("kittens", JSON.stringify(kittens));
    renderKittens(kittens);
    formSection.classList.add("hidden");
    formSection.querySelectorAll("input").forEach((i) => (i.value = ""));
  }
});