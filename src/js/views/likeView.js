import {elements} from './base';
import * as searchView from './searchView';

export const changeLikeBtn = () =>{
    document.querySelector('.recipe_like span').classList.toggle('red_heart');
}

export const renderLikedRecipe = (id, img, title, publisher) =>{
    const markup = 
    `
            <li class="like_list_item" data-id="${id}">
                <a href="#${id}" class="like_link">
                        <img class="like_img" src="${img}" alt="${searchView.limitRecipeTitle(title)}">
                    <div class="like_data">
                        <h4 class="like_name">${searchView.limitRecipeTitle(title)}</h4>
                        <p class="like_author">${publisher}</p>
                    </div>
                </a>
            </li> 
    `;
    elements.likesList.insertAdjacentHTML('afterbegin', markup);
};

export const removeLikeRecipe = (idNum) =>{
    const item = document.querySelector(`[data-id="${idNum}"]`);
    item.parentElement.removeChild(item);
};

export const highlightLikedRecipe = id => {
    const arr = Array.from(document.querySelectorAll('.like_link'));
    arr.forEach(el => el.classList.remove('highlight'));
    document.querySelector(`a[href ="#${id}"]`).classList.add('highlight');
}