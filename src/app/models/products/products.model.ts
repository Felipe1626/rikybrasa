export class Product {
    constructor(
        public name: string,
        public description: string,
        public price: number,
        public avalaible: boolean = false,
        public Category: string
    ){}
}