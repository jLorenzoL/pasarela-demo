export class Product {
    id : number;
    name : string;
    description : string;
    price : number;
    imgUrl : string;

    constructor(id, name, description, price, imageUrl) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.imgUrl = imageUrl;
    }
}
