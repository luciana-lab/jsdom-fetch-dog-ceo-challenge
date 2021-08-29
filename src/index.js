// Couldn't resolve it by myself. Used solution
console.log('%c HI', 'color: firebrick')

// Challenge 1: 
// on page load, fetches the images using the url
// parses the response as JSON
// adds image elements to the DOM for each image in the array

let breeds = [];

document.addEventListener('DOMContentLoaded', function () {
    fetchDogs();
    fetchBreeds();
})

function fetchDogs() {
    fetch('https://dog.ceo/api/breeds/image/random/4')
        .then(response => response.json())
        .then(json => {
            json.message.forEach(image => renderImages(image))
        })
}

function renderImages(dogPicUrl) {
    const dogImageContainer = document.getElementById('dog-image-container')
    const imgTag = document.createElement('img')
    imgTag.src = dogPicUrl
    dogImageContainer.appendChild(imgTag)
}
fetchDogs();

// Challenge 2:
// on page load, fetches all the dog breeds using the url above
// adds the breeds to the page in the <ul> provided in index.html
function fetchBreeds() {
    fetch('https://dog.ceo/api/breeds/list/all')
        .then(response => response.json())
        .then(json => {
            breeds = Object.keys(json.message);
            updateBreedList(breeds);
            addBreedSelectListener();
        })
}

function updateBreedList(breeds) {
    const ul = document.getElementById('dog-breeds');
    removeChildren(ul);
    breeds.forEach(breed => addBreed(breed));
}

function removeChildren(element) {
    let child = element.lastElementChild;
    while (child) {
        element.removeChild(child);
        child = element.lastElementChild;
    }
}

// Challenge 4:
// Once we are able to load all of the dog breeds onto the page,
// add JavaScript so that the user can filter breeds that start with a particular letter using a dropdown.
function selectBreedsStartingWith(letter) {
    updateBreedList(breeds.filter(breed => breed.startsWith(letter)));
}

function addBreedSelectListener() {
    let breedDropdown = document.querySelector('#breed-dropdown');
    breedDropdown.addEventListener('change', function (event) {
        selectBreedsStartingWith(event.target.value)
    })
}

// Challenge 3:
// Once all of the breeds are rendered in the <ul>, add JavaScript so that, 
// when the user clicks on any one of the <li>s, the font color of that <li> changes. 
// This can be a color of your choosing.
function addBreed(breed) {
    let ul = document.querySelector('#dog-breeds')
    let li = document.createElement('li')
    li.innerText = breed;
    li.style.cursor = 'pointer'
    ul.appendChild(li);
    li.addEventListener('click', updateColor);
}

function updateColor(event) {
    event.target.style.color = 'palevioletred';
}