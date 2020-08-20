import axios from 'axios';

export default class Recipe {
    constructor(id){
        this.id = id
    }

    async getRecipe(){
        try{
            const res = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
            this.title = res.data.recipe.title;
            this.ingredients = res.data.recipe.ingredients;
            this.image = res.data.recipe.image_url;
            this.publisher = res.data.recipe.publisher;
            this.source = res.data.recipe.source_url;
            
        }catch(error){
            console.log(error);
            alert('Something went wrong')
        }
    }

    calcTime(){
        this.time = Math.ceil((this.ingredients.length / 3) * 15);

    }

    calcServings(){
        this.servings = 4;
    }

    parseIngredients(){
        const unitsLong = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds', 'pound ',];
        const unitsShort = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'lbs', 'lbs'];
        const newIngredients = this.ingredients.map(el => {
            //  1 uniform units
            let ingredient = el.toLowerCase();
            unitsLong.forEach((unit, i) =>{
                ingredient = ingredient.replace(unit, unitsShort[i])
            })
            // get rid of parentheses
            ingredient = ingredient.replace(/ *\([^)]*\) */g, ' ');

            //parse ingredients into count unit and ingredient itself
            let arIng = ingredient.split(' ');
            let unitIndex = arIng.findIndex(el2 => unitsShort.includes(el2));
            let ingObj;  

            if(unitIndex > -1){
                //means there is a unit
                const arCount = arIng.slice(0, unitIndex);
                let count;
                let str;
                if(arCount.length === 1){
                    count = eval(arIng[0].replace('-', '+'));
                    str = count.toString().split('');
                    str.includes('.') ? count.toFixed(2) : count ;

                }else{
                    count = eval(arCount.join('+'));
                    str = count.toString().split('');
                    str.includes('.') ? count.toFixed(2) : count ; 
                }

                ingObj= {
                    count: count ,
                    unit: arIng[unitIndex],
                    ingredient: arIng.slice(unitIndex + 1).join(' ')
                }
                
            }else if(parseInt(arIng[0], 10)){
                // means there is a number at the beggining of the ingredient
                ingObj = {
                    count: parseInt(arIng[0], 10),
                    unit: '',
                    ingredient: arIng.slice(1).join(' ')
                }
            }else if( unitIndex === -1){
                // means there is no unit
                ingObj = {
                    count: 1,
                    unit: '',
                    ingredient: ingredient
                }
            }
            return ingObj;
        });
        this.ingredients = newIngredients;
    }

    updateServings(type){
        //servings
        const newServings =  type === 'dec' ? this.servings - 1 : this.servings + 1;

        //ingredients
        this.ingredients.forEach(ing =>{
            ing.count *= newServings / this.servings; 
        })
        this.servings = newServings;
    }
}