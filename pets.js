//fetch data from JSON file
fetch("http://localhost:3000/pets")
  .then((response) => response.json())
  .then((pets) => {
    displayPetNames(pets);
  })
  .catch((error) => console.log(error));

// set default animal on page load



//selecting required variables
const petBar = document.querySelector("#container-xl");
const petDetails = document.querySelector("pet-details");
const inputForm = document.querySelector("#input-form")
let pet = null;

// add event listeners to the navbar
//the drop down
const dropdown = document.querySelector(".nav-item.dropdown");

dropdown.addEventListener("click", function(event) {
  event.preventDefault();
  dropdown.classList.toggle("show");
});

// eventlistener to search bar
const searchForm = document.getElementById('search-form');

searchForm.addEventListener('submit', function(event) {
  event.preventDefault();
  console.log("data");
  const searchTerm = document.getElementById('search-term').value;
  console.log(searchTerm);
  fetchData(searchTerm);
});

//fetch data for search term
function filter(pets, cb) {
  const filteredPets = [];
  for (const pet of pets) {
    if (cb(pet)) {
      filteredPets.push(pet);
    }
  }
  return filteredPets;
}

fetchData("dogs");

function fetchData(searchTerm) {
  fetch(`http://localhost:3000/pets`)
    .then(response => response.json())
    .then(data => {
      const filteredData = filter(data, pet => pet.category === searchTerm);
      if (filteredData.length > 0) {
        displayPetNames(filteredData);
      } else {
        alert(`Sorry, we don't have any ${searchTerm} available right now`);
      }
    })
    .catch(error => {
      console.error(error);
    });
}

//displaying searched pet category list
function displayPetNames(filteredPets) {
  const petBar = document.getElementById("container-xl");
  petBar.innerHTML = "";
  filteredPets.forEach(pet => {
    const span = document.createElement("span");
    span.textContent = pet.name;
    span.addEventListener("click", () => displayPetDetails(pet));
    petBar.appendChild(span);
    const adopt = document.getElementById("adopt-btn");
    const popUp = document.getElementById("input-form");
    adopt.addEventListener("click", ()=> {
    popUp.style.display = "block";
  })
  });
  
}


//display pet animal details
function displayPetDetails(selectedPet) {
  const petDetails = document.getElementById("pet-details");
  pet = selectedPet;

  petDetails.innerHTML = `
      <img id="pet-img" src="${pet.image}" alt="${pet.name}"/> 
      <ul class="list-group">
        <p id="pet-name">Pet name: ${pet.name}</p>
        <p id="pet-age">Pet Age: ${pet.age}</p>
        <p id="pet-age">Pet Breed: ${pet.breed}</p>
        <p id="pet-vax"> Pet vaccination: ${pet.vaccinationDate}</p>
        <p id="pet-description"> Description: ${pet.description}</p>
        <p id="pet-likes">Likes: <span id="likes-count">${
          pet.likes || 0}</span></p>
          <div class="like mr-3">
          Like! <span class="like-glyph">&#x2661;</span>
        </div>
        <button type="button" class="btn btn-secondary btn-lg adopt-btn">Adopt</button>
      </ul>
      <div id="input-form">
      <!-- input for email -->
      <div class="mb-3">
        <label id="input-form" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleFormControlInput1" placeholder="name@example.com">
      </div>
      <div class="mb-3">
        <label for="exampleFormControlTextarea1" class="form-label">New Pet Name</label>
        <textarea class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
    </div>
      `;
  
   const petName = document.querySelector('#pet-descri h5');
  
    // check if element exists before adding event listener
    const likeGlyph = document.querySelector('.like-glyph');
    if (likeGlyph) {
      likeGlyph.addEventListener('click', function() {
        //update like count on db
        fetch(`http://localhost:3000/pets/${selectedPet.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ likes: pet.likes + 1}),
        })
        .then((response) => response.json())
        .then((updatedPet) => {
          const likesCount = document.getElementById('likes-count');
          likesCount.innerText = updatedPet.likes;
        })
        
      });
    }

   
}

