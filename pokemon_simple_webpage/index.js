

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  async function changeImageSource() {
      let li = ["images/bug.png","images/fire.png","images/water.png","images/grass.png"
        ,"images/electric.png","images/rock.png","images/ground.png"
        ,"images/steel.png","images/fairy.png","images/dragon.png"
        ,"images/normal.png","images/flying.png","images/ice.png"
        ,"images/dark.png","images/ghost.png","images/psychic.png"
        ,"images/fighting.png","images/poison.png"];
      let arr = [];
      while(li.length > 0){
          const randomIndex = Math.floor(Math.random() * li.length);
          const src_id = "pokemon-type-" + (arr.length + 1); // Incremented by arr length to ensure unique ID
          document.getElementById(src_id).src = li[randomIndex];
          arr.push(li[randomIndex]); // Add the used image source to arr to check for duplicates
          li.splice(randomIndex, 1); // Remove the used image source from li
          await sleep(1010);
      }
      // Generate a random index within the array length
      const randomIndex = Math.floor(Math.random() * arr.length);
  }
  document.querySelectorAll('.pokemon-type').forEach(image => {
    image.addEventListener('mousedown', (event) => {
        event.preventDefault(); // Prevent default behavior like text selection

        let shiftX = event.clientX - image.getBoundingClientRect().left;
        let shiftY = event.clientY - image.getBoundingClientRect().top;

        function moveAt(pageX, pageY) {
            image.style.left = pageX - shiftX + 'px';
            image.style.top = pageY - shiftY + 'px';
        }

        function onMouseMove(event) {
            moveAt(event.pageX, event.pageY);
        }

        document.addEventListener('mousemove', onMouseMove);

        image.onmouseup = function() {
            document.removeEventListener('mousemove', onMouseMove);
            image.onmouseup = null;
        };
    });

    image.ondragstart = function() {
        return false;
    };
});

// document.getElementById('fetchDataBtn').addEventListener('click', () => {
    
//     fetch('https://pokeapi.co/api/v2/pokemon/pikachu')
//         .then(response => response.json())
//         .then(data => {
//             console.log('Fetched data:', data);
//             localStorage.setItem('userData', JSON.stringify( data.sprites.front_default));
//             console.log('Data stored in localStorage');
//         })
//         .catch(error => console.error('Error fetching data:', error));
// });

// // Example function to retrieve data from localStorage and log it
// function retrieveData() {
//     const storedData = localStorage.getItem('userData');
//     if (storedData) {
//         console.log('Retrieved data from localStorage:', JSON.parse(storedData));
//     } else {
//         console.log('No data found in localStorage');
//     }

//}

// Retrieve data on page load
window.onload = retrieveData;

document.getElementById('userForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Get form data
    const formData = new FormData(this);
    const formObject = {};

    for (const [key, value] of formData.entries()) {
        formObject[key] = value;
        console.log(key);

        // Fetch data and store it
        try {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${value}`);
            const data = await response.json();
            console.log('Fetched data:', data);

            // Store image URL in localStorage with a specific key
            localStorage.setItem(key, data.sprites.front_default);
            console.log('Data stored in localStorage');
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    // Store form data in localStorage
    localStorage.setItem('formData', JSON.stringify(formObject));
    console.log('Form data stored in localStorage:', formObject);

    // Update the h1 element with form data
    updateFormInfo(formObject);
});

// Function to retrieve and populate form data from localStorage
function retrieveData() {
    const storedData = localStorage.getItem('formData');
    if (storedData) {
        const formObject = JSON.parse(storedData);
        for (const key in formObject) {
            if (formObject.hasOwnProperty(key)) {
                document.getElementById(key).value = formObject[key];
            }
        }
        console.log('Form data retrieved from localStorage and populated:', formObject);

        // Update the h1 element with form data
        updateFormInfo(formObject);
    }
}

// Function to update the h1 element with form data
function updateFormInfo(data) {
    retrive_func();
}
function deleteNextElement(button) {
    const pokemonType = button.getAttribute('data-type');
    const previousElement = button.previousElementSibling;
    if (pokemonType) {
        localStorage.removeItem(pokemonType);
    }
    if (previousElement) {
        previousElement.remove();
    }
    button.remove();
}
// Function to handle image retrieval and display
function retrive_func() {
    const pokemonTypes = [
        "normal",
        "fire",
        "water",
        "electric",
        "grass",
        "ice",
        "fighting",
        "poison",
        "ground",
        "flying",
        "psychic",
        "bug",
        "rock",
        "ghost",
        "dragon",
        "dark",
        "steel",
        "fairy"
      ];
      for(i in pokemonTypes){
        const storedData = localStorage.getItem(pokemonTypes[i]);
        console.log("i", pokemonTypes[i]);
        console.log("Stored image URL:", storedData);
        if (storedData) {
            const img = document.createElement('img');
            const btn = document.createElement('button');
            img.src = storedData;
            img.alt = 'Pokemon Image';
            btn.setAttribute('data-type', pokemonTypes[i]);
            btn.textContent = 'Delete pokemon';
        btn.onclick = function() { deleteNextElement(this); }; // Set the function reference
        
            const container = document.getElementById('imageContainer');
            container.appendChild(img);
            container.appendChild(btn);
        } else {
            console.log('No data found in localStorage');
        }
      }
}

