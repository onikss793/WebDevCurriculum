class MenuBoard {
    constructor(data) {
        this.products = [];
        this.createProducts(data);
    }

    createProducts(products) {
        this.products = products.map(product => {
            const newProduct = new Product(product);

            newProduct.element.querySelector(".menu-title").textContent =
                newProduct.name;

            return newProduct;
        });
    }

    addClickEvent(func) {
        this.products.forEach(product => {
            const { element, handleClick, name, price } = product;

            element.addEventListener(
                "click",
                (event, productData = { name, price }) =>
                    handleClick(event, productData, func)
            );
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

    handleClick(event, productObj, func) {
        return func(event, productObj);
    }
}
