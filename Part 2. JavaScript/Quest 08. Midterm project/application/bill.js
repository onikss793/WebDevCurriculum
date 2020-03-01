class Bill {
    constructor(endPay) {
        this.options = [
            "amount",
            "total",
            "discount",
            "toPay",
            "change",
            "paid"
        ];
        this.endPay = endPay;
        this.createBill();
        this.getBillOptionElements();
    }

    getData({ amount = 0, total = 0, discount = 0 } = {}) {
        this.amount = amount;
        this.total = total;
        this.discount = discount;
        this.toPay = total;
        this.paid = this.pay();
        this.change = this.getChange();

        this.printBill();
    }

    getChange() {
        const change = this.paid - this.toPay > 0 ? this.paid - this.toPay : 0;

        this.change = change;

        return this.change;
    }

    pay(number = 0) {
        if (number === 0) {
            return 0;
        } else {
            this.paid += number;

            this.getChange();
        }

        this.printBill();
        this.emergeWhenPaidAll();
    }

    printBill() {
        this.options.forEach(option => {
            this.billOption[option].textContent = this.markComma(this[option]);
        });
    }

    emergeWhenPaidAll() {
        this.paid >= this.toPay && this.endPay();
    }

    createBill() {
        this.billList = new Template()
            .cloneTemplate("bill-template")
            .appendTemplate("tools")
            .getElement("bill");
    }

    getBillOptionElements() {
        this.billOption = this.options.reduce((acc, curr) => {
            return {
                ...acc,
                [curr]: this.billList.querySelector(`.${curr}`)
            };
        }, {});
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
}
