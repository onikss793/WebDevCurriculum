class MenuBoard {
    constructor(data, cartToBill) {
        this.products = [];
        this.createProducts(data);
        this.cartToBill = cartToBill;
        this.addEventListener();
    }

    createProducts(data) {
        this.products = data.map(prod => {
            const product = new Product(prod);

            product.element.querySelector(".menu-title").textContent =
                product.name;

            return product;
        });
    }

    addEventListener() {
        this.products.forEach(product => {
            const { element, name, price } = product.sendData();

            element.addEventListener("click", () => {
                this.cartToBill({ name, price });
            });
        });
    }
}

class Product {
    constructor(product) {
        this.createProduct(product);
        this.name = product.name;
        this.price = product.price;
    }

    createProduct() {
        this.element = new Template()
            .cloneTemplate("menu-template")
            .appendTemplate("board")
            .getElement("menu");
    }

    sendData() {
        return {
            element: this.element,
            name: this.name,
            price: this.price
        };
    }
}
