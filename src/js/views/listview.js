import {elements} from './base';


export const renderShoppingList = (items) => {
    const markup = 
        `<h2 class="shopping_title">My Shopping List</h2>
            <ul class="shopping_list">${items.map(it => renderListShopItem(it.id, it.count, it.unit, it.ingredient)).join(' ')}   
        </ul>
    `;
    elements.myShoppingList.insertAdjacentHTML('afterbegin', markup);
}


const renderListShopItem = (id, count, unit, ingredient)=> `<li class="shopping_item" data-id="${id}">
<div class="input_count">
    <input type="number" min = "0" value="${count % 1 === 0 ? count : count.toFixed(2)}" step="${(count/2) % 1 === 0? count/2 : (count/2).toFixed(2)}">
</div>
<p class="shopping_description">${unit} ${ingredient}</p>
<span class="material-icons shopping_delete_btn">delete_forever
</span>
</li>`;


export const removeShoppingList = div =>{
    div.innerHTML = '';
};


export const removeShoppingItem = id =>{
    const item = document.querySelector(`[data-id="${id}"]`);
    item.parentElement.removeChild(item);
}