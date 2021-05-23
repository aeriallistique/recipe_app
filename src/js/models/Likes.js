export default class Likes {
    constructor(){
        this.like = []
    }

    addLike(id, image, title, publisher){
        const likeItem = {
            id,
            image,
            title,
            publisher
        }
        this.like.push(likeItem)
        //persist Data
        this.persistData();
    }

    deleteLike(id) {
        const index = this.like.findIndex(el => el.id === id);
        this.like.splice(index, 1)
        //persist data
        this.persistData();
    }

    isLiked(id){
       return this.like.findIndex(el => el.id === id) !== -1;
    }

    persistData(){
        localStorage.setItem('likes', JSON.stringify(this.like));
    }

    readStorageData() {
        const item = JSON.parse(localStorage.getItem('likes'));
        if(item) this.like = item;
    }

}