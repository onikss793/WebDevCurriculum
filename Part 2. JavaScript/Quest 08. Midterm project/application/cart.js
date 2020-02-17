class Cart {
    constructor() {
        this.product = {};
        this.rowElements = [];
    }

    addToCart(event, productObj) {
        const target = this.deleteSpace(productObj.name);

        if (this.isCartEmpty()) {
            this.product[target] = [productObj];
            this.createRow(target);
        } else {
            if (this.isProductInCart(target)) {
                this.product[target].push(productObj);
            } else {
                this.product[target] = [productObj];
                this.createRow(target);
            }
        }

        const row = this.getRow(target);

        this.printRow(target, row);

        return this;
    }

    deleteSpace(string) {
        return string.replace(/\s+/g, "");
    }

    isCartEmpty() {
        return !Object.keys(this.product).length;
    }

    isProductInCart(target) {
        const cart = Object.keys(this.product);

        for (const item of cart) {
            if (item === target) {
                return true;
            }
        }

        return false;
    }

    createRow(target) {
        const row = new Template()
            .cloneTemplate("cart-template")
            .appendTemplate("cart-table tbody")
            .getElement("product");

        const className = this.deleteSpace(target);

        row.classList.add(className);
        this.rowElements.push(row);

        return this;
    }

    printRow(target, row) {
        const dataObject = this.extractData(target);
        let text = "";

        for (let key in dataObject) {
            const data = dataObject[key];

            text += `<td>${data}</td>`;
        }

        row.innerHTML = text;
    }

    extractData(target) {
        const items = Object.keys(this.product);
        const products = this.product[target];

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

    getRow(target) {
        for (let row of this.rowElements) {
            const classList = Array.from(row.classList);

            if (classList.includes(target)) {
                return row;
            }
        }
    }
}
