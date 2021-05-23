import Search from './models/Search';
import Recipe from './models/Recipe';
import List from './models/list';
import Likes from './models/Likes';


import * as searchView from './views/searchView';
import * as recipeView from './views/recipeView';
import * as listView from './views/listView';
import * as likeView from './views/likeView';


import {elements} from './views/base';

const state = {};

const controlSearch = async () =>{
    // 1. get query from the view
    
    const query = searchView.getInput(); 


    if(query){
        // 2. add new search object to the state
        state.search = new Search(query);
        
        // 3. prepare ui for results
        searchView.clearInput();
        searchView.clearResult();
        searchView.renderLoader(elements.recipeList);
        
    try{
        // 4. search for recipes
        await state.search.getResult();
        searchView.clearLoader();
        //5 render results on UI
        searchView.renderResults(state.search.result);
       // console.log(state.search.result);

    }catch(error){
        prompt(`something went wrong`);
        }
         searchView.clearLoader();
    }   
}


elements.searchForm.addEventListener('submit', e =>{
    e.preventDefault();
    controlSearch();
});

elements.pageButtons.addEventListener('click', (e) => {
    const btn = e.target.closest('.page');
    const data = parseInt(btn.dataset.goto, 10);
    if(btn){
        searchView.clearResult();
        searchView.renderResults(state.search.result, data, 10);
    }
});


const controlRecipe = async() => {
    const id = window.location.hash.replace('#', '');
    if(id){
        if(state.recipe) searchView.highlightRecipe(id);
        state.recipe = new Recipe(id);

        try{
            await state.recipe.getRecipe();
            state.recipe.parseIngredients();
            state.recipe.calcTime();
            state.recipe.calcServings();

           //console.log(state.recipe);
            searchView.renderLoader(elements.recipeView);
        
            recipeView.clearRecipe();    
           // recipeView.renderRecipe(id, state.recipe.title, state.recipe.image, state.recipe.time, state.recipe.servings);
            recipeView.newRenderRecipe(state.recipe, state.likes.isLiked(id));
        }catch(error){
            alert(`Error proccesing.`);
        }
        }
};


['hashchange', 'load'].forEach(ev => window.addEventListener(ev, controlRecipe));

const likeControler = () => {
    if(!state.likes) state.likes = new Likes();
    const currentID = state.recipe.id;

    // IF recipe is NOT LIKED ... update the UI and 
    if(!state.likes.isLiked(currentID)){
        //add like to this.like array
        state.likes.addLike(currentID, state.recipe.image, state.recipe.title, state.recipe.publisher);
        // toggle heart color
        likeView.changeLikeBtn();
        likeView.renderLikedRecipe(currentID, state.recipe.image, state.recipe.title, state.recipe.publisher);      

    }else if(state.likes.isLiked(currentID)){
    // IF recipe IS liked ...delete like from this.like array remove from UI and toggle heart color
        state.likes.deleteLike(currentID);
        //toggle heart color
        likeView.changeLikeBtn();
        likeView.removeLikeRecipe(currentID);
    }
}

elements.recipeView.addEventListener('click', (e) =>{
    //console.log(e.target)
    if(e.target.matches('.plus')){
        if(state.recipe.servings < 12){
            state.recipe.updateServings('inc');
            recipeView.updateCountandServings(state.recipe);
        }
    }else if(e.target.matches('.minus')){
        if(state.recipe.servings > 1){
            state.recipe.updateServings('dec');
            recipeView.updateCountandServings(state.recipe);
        }
    }else if(e.target.matches('.recipe_like, .recipe_like *')){
        likeControler();
    }
} );

elements.likesList.addEventListener('click', e =>{
    likeView.highlightLikedRecipe(state.likes.id)
});

//read likes from local storage and put them back in likes list
window.addEventListener('load', () => {
    state.likes = new Likes()
    state.likes.readStorageData();
    state.likes.like.forEach(like => likeView.renderLikedRecipe(like.id, like.image, like.title, like.publisher))
})



elements.recipeView.addEventListener('click', e => {
    if(e.target.matches('.add_to_shopping')){
        //remove shopping list if there already is one
        listView.removeShoppingList(elements.myShoppingList);

        //create List object
        state.list = new List();

        //add items to the list object
        state.recipe.ingredients.forEach(el => state.list.addItem(el.count, el.unit, el.ingredient))
        //console.log(state.list.items)

        //add render List items to the shopping list
        listView.renderShoppingList(state.list.items);

        //delete list item
        elements.myShoppingList.addEventListener('click', e =>{
            if(e.target.matches('.shopping_delete_btn')){
                const deletingId = e.target.parentElement.dataset;
                listView.removeShoppingItem(deletingId.id);
                state.list.deleteItem(deletingId.id);      
            }
        })
    }
});