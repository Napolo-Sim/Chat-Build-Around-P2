const mainScreen = document.querySelector(`.main-screen`)
const pokeName = document.querySelector(`.Pokemon-name`);
const pokeType = document.querySelector(`.Pokemon-type`);
const pokeAbil1 = document.querySelector(`.Pokemon-Abil-1`);
const pokeAbil2 = document.querySelector(`.Pokemon-Abil-2`);
const pokeHeight = document.querySelector(`.Pokemon-height`);
const pokeWeight = document.querySelector(`.Pokemon-weight`);
const pokeImage = document.querySelector(`.Pokemon-image`);
const submitBtn = document.querySelector(`#submitBtn`);
const pokeListItems = document.querySelectorAll(`.list-item`);
const leftButton = document.querySelector(`.left-button`);
const rightButton = document.querySelector(`.right-button`);

////////////////////////////////////////////////////////////////
let prevUrl = null;
let nextUrl = null;



var i = 0;
var txt = 'A social hub to collect, trade, and chat about your favorite trading cards.'; /* The text */
var speed = 70; /* The speed/duration of the effect in milliseconds */

function typeWriter() {
    if (i < txt.length) {
        document.getElementById("welcome-subtext").innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}
typeWriter();


$(document).ready(function () {

    $(".userSearch").hide();

    $(submitBtn).on("click", (event) => {
        event.preventDefault();
        $(".userSearch").show();
        let pokemon = $("#userInput").val();
        $("#userInput").val("");
        $.ajax({
            type: "GET",
            url: `https://pokeapi.co/api/v2/pokemon/${pokemon}/ `,
            datatype: "JSON",
        }).then((response) => {
            console.log(response);
            //Name
            pokeName.textContent = response.name;
            //Type
            console.log(response.types[0].type.name);
            pokeType.textContent = `Type: ${response.types[0].type.name}`;
            //Image
            pokeImage.src = response.sprites.front_default;
            // Abilities
            pokeAbil1.textContent = `Ability 1: ${response.abilities[0].ability.name}`
            pokeAbil2.textContent = `Ability 2: ${response.abilities[1].ability.name}`
            // Height
            pokeHeight.textContent = `Height: ${response.height}`
            // Weight
            pokeWeight.textContent = `Weight: ${response.weight}`
        });
    });

    for (var i = 0; i < 20; i++) {
        $(".demo").append(`  <div class="card">
    <div class="card-image waves-effect waves-block waves-light">
      <img class="activator card-img-top" src="">
    </div>
    <div class="card-content">
      <p class="card-text list-item"></p>
    </div>
    <div class="card-reveal">
    </div>
  </div>`);
    }
});

//Toggle button functionality
document.addEventListener("DOMContentLoaded", () => {
    // Get all "navbar-burger" elements
    const $navbarBurgers = Array.prototype.slice.call(
        document.querySelectorAll(".navbar-burger"),
        0
    );

    // Check if there are any navbar burgers
    if ($navbarBurgers.length > 0) {
        // Add a click event on each of them
        $navbarBurgers.forEach((el) => {
            el.addEventListener("click", () => {
                // Get the target from the "data-target" attribute
                const target = el.dataset.target;
                const $target = document.getElementById(target);

                // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
                el.classList.toggle("is-active");
                $target.classList.toggle("is-active");
            });
        });
    }
});


const fetchPokeData = (id) => {
    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(res => res.json())
        .then(data => {
            console.log(data);

            resetScreen();

            const dataTypes = data.types;
            const dataFirstType = dataTypes[0];
            pokeTypeOne.textContent = dataFirstType.type.name;

            mainScreen.classList.add(dataFirstType.type.name);
            mainScreen.classList.remove(`hide`);

            pokeName.textContent = data.name;
            pokeId.textContent = data.id;

            pokeFrontImage.src = data.sprites.front_default || "";
        });
}


const handleLeftButtonClick = () => {
    if (prevUrl) {
        fetchPokeList(prevUrl)
    }
};

const handleRightButtonClick = () => {
    if (nextUrl) {
        fetchPokeList(nextUrl)
    }
};

const handleListItemClick = (e) => {
    if (!e.target) return;

    const listItem = e.target;
    if (!listItem.textContent) return;

    const id = listItem.textContent.split(".")[0];
    fetchPokeData(id);
};

//This is for the next and previous buttons on home page
leftButton.addEventListener("click", handleLeftButtonClick)
rightButton.addEventListener("click", handleRightButtonClick)

for (const pokeListitem of pokeListItems) {
    pokeListitem.addEventListener("click", handleListItemClick)
}


const fetchPokeList = (url) => {
    //Get data for card displays on home screen
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data);
            const {
                results,
                previous,
                next
            } = data;
            prevUrl = previous;
            nextUrl = next;

            for (let i = 0; i < pokeListItems.length; i++) {
                const pokeListItem = pokeListItems[i];
                const resultData = results[i];
                const {
                    name
                } = resultData;

                if (resultData) {
                    const {
                        name,
                        url
                    } = resultData;
                    const urlArray = url.split("/");
                    const id = urlArray[urlArray.length - 2];
                    pokeListItem.textContent = id + ". " + name;
                } else {
                    pokeListItem.textContent = "";
                }
            }
        });
}

//Initialize App 
fetchPokeList("https://pokeapi.co/api/v2/pokemon?offset=0&limit=20");