import {elements} from './base';




/*
export const renderRecipe = (ID, title, img, time, servings) => {
    const markup =`
    <figure class="view_img">
        <img src="${img}" alt="${title}">
    </figure>
                <div class="view_description">
                    <h2 class="view_title">${title}</h2>
                </div>
                <div class="recipe_details">
                    <div class="recipe_minutes">${time} Minutes</div>
                        <div class="recipe_servings">
                            <div class="the_butons">
                                <button class="plus serving_btn"> + </button>
                                <button class="minus serving_btn"> - </button>
                            </div>
                            <p>${servings} Servings</p>
                        </div>
                        <button class="recipe_like">
                            <span class="material-icons">
                                favorite
                                </span>
                        </button>
                </div>
    `;
    elements.recipeView.insertAdjacentHTML('afterbegin', markup);

};
*/



export const newRenderRecipe = (recipe, isLiked) => {
    const markup = `
    <figure class="view_img">
    <img src="${recipe.image}" alt="${recipe.title}">
    </figure>
        <div class="view_description">
            <h2 class="view_title">${recipe.title}</h2>
        </div>
        <div class="recipe_details">
            <div class="recipe_minutes">${recipe.time} Minutes</div>
                <div class="recipe_servings">
                    <div class="the_butons">
                        <button class="plus serving_btn"> + </button>
                        <button class="minus serving_btn"> - </button>
                    </div>
                    <p class="recipe_servings_amount">${recipe.servings} Servings</p>
                </div>
                <button class="recipe_like">
                    <span class="material-icons like_heart ${isLiked ? 'red_heart' : ''}">
                    favorite
                    </span>
                </button>
            </div>
    <div class="recipe_ingredients">
    
        <ul class="ingredients_list">
        ${recipe.ingredients.map(el => renderListItem(el)).join(' ')}  
        </ul>
        <button class="add_to_shopping">Add to shopping</button>
    </div>
    <div class="recipe_directions">
                <h2 class="directions_title">HOW TO COOK IT</h2>
                <P class="recipe_directions_text">This recipe was carrefully designed and tested by the <br><b>${recipe.publisher}</b>.<br> Please check out directions at their website.</P>
                <button class="recipe_btn"> <a class="recipe_btn-link" href="${recipe.source}">DIRECTIONS</a> </button>
            </div>
    `;

    elements.recipeView.insertAdjacentHTML('afterbegin', markup);
};



const renderListItem = (ing) => `<li class="ingredient_item">
<div class="ingredient_count">${ing.count % 1 === 0 ? ing.count : ing.count.toFixed(2)}
</div>
<div class="ingredient_actual">
<span class="ingredient_unit">${ing.unit}</span>
${ing.ingredient}
</div>
</li> `;


export const clearRecipe = () => {
    elements.recipeView.innerHTML = '';
};

export const updateCountandServings = recipe =>{
    //update servings
    document.querySelector('.recipe_servings_amount').textContent = `${recipe.servings} SERVINGS`;
    // update each ingredient count
    const countArr = Array.from(document.querySelectorAll('.ingredient_count'));
    countArr.forEach((ing, i) => ing.textContent = `${recipe.ingredients[i].count % 1 === 0 ? recipe.ingredients[i].count : recipe.ingredients[i].count.toFixed(2)}` );
};