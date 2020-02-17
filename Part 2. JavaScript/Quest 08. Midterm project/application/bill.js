class Bill {
    constructor() {
        this.options = [
            "amount",
            "total",
            "discount",
            "toPay",
            "change",
            "paid"
        ];
        this.createBill().getBillOptionElements();
    }

    getData(cart) {
        const products = cart.product;

        this.amount = this.getAmount(products);
        this.total = this.getTotal(products);
        this.discount = this.discount;
        this.toPay = this.getTotal(products);
        this.paid = this.getPaid();
        this.change = this.getChange();

        return this;
    }

    createBill() {
        this.billList = new Template()
            .cloneTemplate("bill-template")
            .appendTemplate("tools")
            .getElement("bill");

        return this;
    }

    getBillOptionElements() {
        this.billOption = this.options.reduce((acc, curr) => {
            return {
                ...acc,
                [curr]: this.billList.querySelector(`.${curr}`)
            };
        }, {});

        return this;
    }

    printBill() {
        this.options.forEach(option => {
            this.billOption[option].textContent = this.markComma(this[option]);
        });

        return this;
    }

    markComma(number = 0) {
        const strNum = String(number);
        let markedNum = "";
        let count = 0;

        for (let i = strNum.length - 1; i >= 0; i--) {
            if (count !== 0 && count % 3 === 0) {
                markedNum = "," + markedNum;
            }

            count++;
            markedNum = strNum[i] + markedNum;
        }

        return markedNum;
    }

    getPaid(number = 0) {
        if (number === 0) {
            return 0;
        } else {
            this.paid += number;

            this.getChange();
        }

        return this;
    }

    getChange() {
        const change = this.paid - this.toPay > 0 ? this.paid - this.toPay : 0;

        this.change = change;

        return this.change;
    }

    emergeWhenPaidAll(endProcess) {
        this.paid >= this.toPay && endProcess();
    }

    getTotal(products) {
        let total = 0;

        for (const target in products) {
            const prods = products[target];

            total += prods.reduce((acc, curr) => {
                return acc + curr.price;
            }, 0);
        }

        return total;
    }

    getAmount(products) {
        let amount = 0;

        for (const target in products) {
            amount += products[target].length;
        }

        return amount;
    }
}
