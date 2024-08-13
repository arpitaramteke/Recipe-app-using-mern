
const searchBTTN = document.querySelector(".searchBtn");

const searchbox = document.querySelector(".searchBox");

const recipecontainer = document.querySelector(".recipe-container");

const recipeDetailsContent = document.querySelector(".recipe-details-content");

const recipeCloseBtn = document.querySelector(".recipe-close-btn"); // Assuming there's a class like this for the close button

const fetchRecipes = async (query = "") => {
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
    const response = await data.json();

    recipecontainer.innerHTML = "";

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement("div");
        recipeDiv.classList.add("recipe");

        recipeDiv.innerHTML = `
            <img src="${meal.strMealThumb}">
            <h2>${meal.strMeal}</h2>
            <p>This Dish found in <span>${meal.strArea}</span></p>
            <p>Category: <span>${meal.strCategory}</span></p>
        `;
        
        const button = document.createElement("button");
        button.textContent = "Get Recipe";
        recipeDiv.appendChild(button);

        button.addEventListener("click", ()=>{
            openRecipePopup(meal)
        })

        recipecontainer.appendChild(recipeDiv);
    });
}

const fetchIngredients = (meal) =>{
    let ingredientList = "";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient){
            const measure = meal[`strIngredient${i}`];
            ingredientList += `<li>${measure}${ingredient}</li>`
        }
        else{
            break;
        }
    }
    return ingredientList;
}

const openRecipePopup = (meal) =>{
    recipeDetailsContent.innerHTML = `
        <h2 class="recipeName">${meal.strMeal}</h2>
        <h2> Ingredients:</h2>
        <ul class="ingredientList">${fetchIngredients(meal)}</ul>
        <div>
        <h3>Instructions:<h3>
        <p class="instructions">${meal.strInstructions}</p>
        </div>
    `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener("click", ()=>{
    recipeDetailsContent.parentElement.style.display = "none";
})

searchBTTN.addEventListener("click", (e) => {
    e.preventDefault();
    const searchInput = searchbox.value.trim();
    fetchRecipes(searchInput);

    searchbox.addEventListener("input", (e) => {
        e.preventDefault();
        const searchInput = searchbox.value.trim();
        fetchRecipes(searchInput);
    });
    
});
