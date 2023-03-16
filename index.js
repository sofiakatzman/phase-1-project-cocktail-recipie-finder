//wait for dom to load to start up tbd if necessary
document.addEventListener("DOMContentLoaded", function() {});

//sends request for data from server
const url = "http://localhost:3000/recipes"

//DOM element selectors that collect user filter labels
const form = document.querySelector('form')
const dropdownSpiritBase = document.querySelector('#dropdownSpiritBase')
const dropdownMixer = document.querySelector('#dropdownMixer')
let divCollect = document.querySelector('#recipe-display')

//event listener that waits for button to be clicked to store the filter label data
form.addEventListener('submit', (event) => {
  event.preventDefault()
  const selectedSpiritBase = dropdownSpiritBase.value
  const selectedMixer = dropdownMixer.value

  //server fetch request to retrieve json data
  fetch(url)
  .then(response => response.json())
  .then(data => {
    data.forEach(recipe => { 
  //filter function that itterates through kson data
  //need to add if statements for when only one or the other is picked
  console.log(recipe.baseSpirit)
  console.log(selectedSpiritBase)
  console.log(recipe.mixer)
  console.log(selectedMixer)

        if(recipe.baseSpirit === selectedSpiritBase && recipe.mixer === selectedMixer){
          displayRecipeCard(recipe)  
          console.log(recipe.name)
        } else {
            console.log("Please try a different combination!") // in the end we want this to return only if there are NO matched recipes
        }
    })
  })
  .catch(error => console.error(error))
})

function displayRecipeCard(recipe){
  // creates a heading for drink name
  const h5 = document.createElement('h5')
  h5.innerText= "Ingredients:";
  const h4 = document.createElement('h4')
  h4.innerText = recipe.name

  // displays drink photo
  const img = document.createElement('img')
    img.setAttribute('src', recipe.imageURL)

  //creates a paragraph element that can hold drink ingredients
    img.setAttribute('class', 'recipe-photo')
    const pLikes = document.createElement('p')
    pLikes.innerText = `Recipe Likes: ${recipe.likeCount}`

  //trying to create a list of ingredients as li elements - for each loop because it is an array of ingredients
      const ul = document.createElement("ul");
      const ingredients = recipe.ingredientsList
      ingredients.forEach(item => {
        const li = document.createElement("li")
        li.textContent = item
        ul.appendChild(li)
      })

  //displays instructions
   const p = document.createElement("p")
    p.innerText = recipe.instructions

  //creates like button 
    const btn = document.createElement('button')
    btn.setAttribute('class', 'like-btn')
    btn.innerText = "like"

  //puts all new elements together into one card
    const divCard = document.createElement('div')
    divCard.setAttribute('class', 'card')
    divCard.append(h4, img, h5, ul, p, pLikes, btn)
    divCollect.append(divCard)
}

// document.addEventListener('click', () => {
//   fetch("http://localhost:3000/recipes")
//     .then(response => response.json())
//     .then(data => {
//       // Find the recipe you want to update in the data array
//       const recipeToUpdate = data.find(recipe => recipe.id === recipeId);
//       if (!recipeToUpdate) {
//         console.log(`Could not find recipe with ID ${recipeId}`);
//         return;
//       }
//       // Update the number of likes for the recipe
//       recipeToUpdate.likeCount += 1;
      
//       // Send a PATCH request to update the recipe on the server
//     //   fetch(`url${recipeToUpdate.id}`, {
//     //     method: 'PATCH',
//     //     headers: {
//     //       'content-type': 'application/json'
//     //     },
//     //     body: JSON.stringify(recipeToUpdate)
//     //   })
//     //   .then(res => res.json())
//     //   .then(updatedRecipe => console.log(updatedRecipe));
//     // });
// });