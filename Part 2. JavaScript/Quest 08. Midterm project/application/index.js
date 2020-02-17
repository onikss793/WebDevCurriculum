class Data {
    constructor() {
        this.createMenu();
    }

    createMenu() {
        this.menu = [
            { name: "아메리카노", price: 5000 },
            { name: "카페 라떼", price: 6000 },
            { name: "카푸치노", price: 6500 },
            { name: "아메리카노", price: 5000 },
            { name: "카페 라떼", price: 6000 },
            { name: "카푸치노", price: 6500 }
        ];
    }
}

class Template {
    constructor() {}

    getElByTemplate(selector) {
        return document.querySelectorAll(`.${selector}`)[
            document.querySelectorAll(`.${selector}`).length - 1
        ];
    }

    cloneTemplate(template) {
        this.template = document
            .querySelector(`.${template}`)
            .content.cloneNode(true);

        return this;
    }

    appendTemplate(selector) {
        this.parent = document.querySelector(`.${selector}`);
        this.parent.appendChild(this.template);

        return this;
    }
}

class Pos {
    constructor() {
        this.prepare()
            .setCart()
            .setProduct();
    }

    prepare() {
        this.setData().setBoard();

        return this;
    }

    setData() {
        this.data = new Data();

        return this;
    }

    setBoard() {
        this.board = new MenuBoard();

        return this;
    }

    setCart() {
        this.cart = new Cart();

        return this;
    }

    setProduct() {
        this.board
            .addProducts(this.data.menu)
            .printProducts()
            .addClickEvent((prodObj, e) => this.cart.addToCart(prodObj, e));

        return this;
    }
}

class MenuBoard {
    constructor() {
        this.products = [];
    }

    addProducts(products) {
        this.products = products.map(product => new Product(product));

        return this;
    }

    printProducts() {
        this.products.forEach(({ element, name }) => {
            element.querySelector(".menu-title").textContent = name;
        });

        return this;
    }

    addClickEvent(func) {
        this.products.forEach(product => {
            const { element, handleClick } = product;

            element.addEventListener("click", (e, prodObj = product) =>
                handleClick(e, prodObj, func)
            );
        });
    }
}

class Product {
    constructor(prod) {
        this.createProduct(prod);
        this.name = prod.name;
        this.price = prod.price;
    }

    createProduct() {
        this.element = new Template()
            .cloneTemplate("menu-template")
            .appendTemplate("board")
            .getElByTemplate("menu");

        return this;
    }

    handleClick(e, prodObj, func) {
        return func(prodObj, e);
    }
}

class Cart {
    constructor() {
        this.cart = {};
        this.rows = [];
    }

    convertData(target) {
        const items = Object.keys(this.cart);
        const products = this.cart[target];

        return products.reduce((acc, curr) => {
            return {
                ...acc,
                index: items.indexOf(target) + 1,
                name: curr.name,
                count: products.length,
                price: curr.price,
                discount: 0,
                total: products.length * curr.price
            };
        }, {});
    }

    renderRow(target, row) {
        const { index, name, count, price, discount, total } = this.convertData(
            target
        );

        row.innerHTML = `<td class="product-index">${index}</td>
        <td class="product-name">${name}</td>
        <td class="product-count">${count}</td>
        <td class="product-price">${price}</td>
        <td class="product-discount">${discount}</td>
        <td class="product-total">${total}</td>`;
    }

    deleteSpace(string) {
        const rawString = string + "";

        return rawString.replace(/\s+/g, "");
    }

    createRow(target) {
        const row = new Template()
            .cloneTemplate("cart-template")
            .appendTemplate("cart-table tbody")
            .getElByTemplate("product");

        const className = this.deleteSpace(target);

        row.classList.add(className);
        this.rows.push(row);

        return row;
    }

    getRow(target) {
        for (let row of this.rows) {
            const classList = Array.from(row.classList);

            if (classList.includes(target)) {
                return row;
            }
        }
    }

    addToCart(product, e) {
        let row;
        const target = this.deleteSpace(product.name);

        if (this.isCartEmpty()) {
            this.cart[target] = [product];
            row = this.createRow(target);
        } else {
            if (this.isProductInCart(target)) {
                this.cart[target].push(product);
                row = this.getRow(target);
            } else {
                this.cart[target] = [product];
                row = this.createRow(target);
            }
        }

        this.renderRow(target, row);

        return this;
    }

    isProductInCart(target) {
        const cart = Object.keys(this.cart);
        let status = false;

        cart.forEach(item => {
            if (item === target) {
                status = true;
            }
        });

        return status;
    }

    isCartEmpty() {
        return !Object.keys(this.cart).length;
    }
}

class Bill {}

class Calculator {}
