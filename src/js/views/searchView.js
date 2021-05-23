
import {elements, elementStrings} from './base';

export const getInput = () => elements.inputField.value; 

export const clearInput = () => elements.inputField.value = '';

export const renderLoader = (parent) => {
    const markup = `
    <div class="${elementStrings.loader}">
        <span class="material-icons spinning_loader">
            autorenew
        </span>
    </div>`;
    parent.insertAdjacentHTML('afterbegin', markup);
};

export const clearLoader = () => {
    const loader = document.querySelector(`.${elementStrings.loader}`);
    if(loader){
        loader.parentElement.removeChild(loader);
    }
};

export const clearResult = () => {
    elements.recipeListUl.innerHTML = '';
    elements.pageButtons.innerHTML = '';
};



export const limitRecipeTitle = (title, limit = 17) =>{
    const newTitle = [];
    if(title.length > limit) {
        title.split(' ').reduce((acc, cur) => {
            if(acc + cur.length <= limit){
                newTitle.push(cur);
            }
            return acc + cur.length
        }, 0)
        return `${newTitle.join(' ')}...`
    }
    return title
}

const renderRecipe = recipe =>{
    const markup = `
    <li>
        <a href="#${recipe.recipe_id}" class="recipe_link">
            <figure class="recipe_img">
                <img src="${recipe.image_url}" alt="${limitRecipeTitle(recipe.title)}">
            </figure>
            <div class="recipe_data">
                <h4 class="recipe_name">${limitRecipeTitle(recipe.title)}</h4>
                <p class="recipe_author">${limitRecipeTitle(recipe.publisher)}</p>
            </div>
        </a>
    </li>`;
    elements.recipeListUl.insertAdjacentHTML('beforeend', markup);
};

const createButtons = (page, type) => `
    <button class="page ${type} page${type === 'prev' ? page -1 : page + 1}" data-goto = ${type === 'prev' ? page -1 : page + 1}>
        Page ${type === 'prev' ? page -1 : page + 1}   
        <span class="material-icons">
        arrow_${type === 'prev' ? 'left' : 'right'}
        </span>    
    </button>
`;



const renderButtons = (page, numResults, resPerPage ) =>{
    let button;
    const pages = Math.ceil(numResults / resPerPage);
    if(page === 1 && pages > 1){
        //render next btn
        button = createButtons(page, 'next');
    }else if(page < pages){
        //render both prev and next buttons
        button = `${createButtons(page, 'prev')}
                  ${createButtons(page, 'next')}`;
    }else if(page === pages && pages > 1){
        //render prev button
        button = createButtons(page, 'prev');
    }

    elements.pageButtons.insertAdjacentHTML('afterbegin', button);
}

export const renderResults = (recipes, page = 1, resPerPage = 10) => {
    const start = (page - 1) * resPerPage;
    const end = page * resPerPage;

    recipes.slice(start, end).forEach(renderRecipe);
    renderButtons(page, recipes.length, resPerPage = 10);
}

export const highlightRecipe = id => {
    const arr = Array.from(document.querySelectorAll('.recipe_link'));
    arr.forEach(el => el.classList.remove('highlight'));
    document.querySelector(`a[href ="#${id}"]`).classList.add('highlight');
}