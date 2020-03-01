class Cart {
    constructor(checkDiscount) {
        this.product = {};
        this.rowElements = [];
        this.checkDiscount = checkDiscount;
    }

    sendData() {
        const products = Object.keys(this.product).map(
            key => this.product[key]
        );

        const total = this.getTotal(products);

        const amount = this.getAmount(products);

        return {
            amount,
            total,
            discount: 0
        };
    }

    getTotal(products) {
        return products
            .map(prods =>
                prods.reduce((acc, curr) => {
                    return acc + curr.price;
                }, 0)
            )
            .reduce((acc, curr) => acc + curr);
    }

    getAmount(products) {
        return products
            .map(product => product.length)
            .reduce((acc, curr) => acc + curr);
    }

    addToCart(productObj) {
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

    sendDataForDiscount() {
        let data = [];

        for (const key in this.product) {
            for (const product of this.product[key]) {
                data.push(product.name);
            }
        }

        return data;
    }

    extractData(target) {
        const items = Object.keys(this.product);
        const products = this.product[target];

        this.checkDiscount(this.sendDataForDiscount());

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
        for (const row of this.rowElements) {
            const classList = [...row.classList];

            if (classList.includes(target)) {
                return row;
            }
        }
    }
}
