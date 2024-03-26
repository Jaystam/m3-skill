const pokemonImage = document.getElementById("js--pokemon-image")
let randomNumber = Math.floor(Math.random() * 1019 + 1);

let pokemon = fetch("https://pokeapi.co/api/v2/pokemon/" + randomNumber)
    .then(function (response) {
        return response.json();
    })
    .then(function (realData) {
        pokemonImage.src = realData.sprites.front_default;
        pokemonName = realData.species.name;
        pokemonNameCap = pokemonName.charAt(0).toUpperCase() + pokemonName.slice(1)
    });

/*Api call naar de tv show*/
const tvShow = document.getElementById("js--tvShow")
const tvShowDesc = document.getElementById("js--tvShowDesc")
const tvShowImage = document.getElementById("js--tvShowImage")
fetch("https://api.tvmaze.com/search/shows?q=ferb")
  .then(function (response) {
    return response.json();
  })
  .then(function (realData) {
    tvShow.innerText = realData[0].show.name;
    tvShowDesc.innerHTML = realData[0].show.summary;

  })

/*Api call naar de pokemon*/
const catchButton = document.getElementById("js--catch-button");
const pokemonText = document.getElementById("js--pokemon-text");
let pokemonGamePlayed = false;

catchButton.onclick = function () {
    if (pokemonGamePlayed === false) {
        let catchNumber = Math.floor(Math.random() * 2);
        if (catchNumber === 0) {
            pokemonText.innerText = pokemonNameCap + " has fled!"
        }
        else {
            pokemonText.innerText = pokemonNameCap + " has Caught!"
        }
        pokemonGamePlayed = true;
    }
}

const nameText = document.getElementById("js--name");
const inputField = document.getElementById("js--input");
inputField.onkeyup = function(event) {
    if (event.keyCode === 13) {
        let name = inputField.value;
        /*Api call naar de age predictor*/
        let age = fetch("https://api.agify.io/?name=" + name)
            .then(function (response) {
            return response.json();
            })
            .then(function(realData) {
                inputField.style.display = "none";
                nameText.innerText = realData.age;
            });
    }
}