class Pos {
    constructor() {
        this.clearPos()
            .loadPos()
            .eventSetUp();
    }

    clearPos() {
        this.bill = new Bill();
        this.cart = new Cart();
        this.payment = new Payment();

        return this;
    }

    loadPos() {
        this.data = new Data();
        this.menuBoard = new MenuBoard(this.data.menu);
        this.calculator = new Calculator();

        this.menuBoard;

        return this;
    }

    eventSetUp() {
        this.payment.addClickEvent(this.sendStatus);
        this.calculator.addClickEvent(this.calcToBill);
        this.menuBoard.addClickEvent((event, productObj) =>
            this.cartToBill(event, productObj)
        );
    }

    cartToBill = (event, productObj) => {
        this.cart.addToCart(event, productObj);
        this.bill.getData(this.cart).printBill();
    };

    calcToBill = money => {
        this.bill
            .getPaid(money)
            .printBill()
            .emergeWhenPaidAll(this.endProcess);
    };

    sendStatus = status => {
        if (status === "cancel") {
            this.resetPos();
        } else if (status === "card") {
            this.payment.setStatus("card");
            this.calcToBill(this.bill.toPay);
        }
    };

    endProcess = () => {
        this.alert().saveData();

        setTimeout(this.resetPos, 2000);
    };

    saveData = () => {
        const { amount, total, discount, toPay, change, paid } = this.bill;

        const cart = { ...this.cart.product };
        const bill = { amount, total, discount, toPay, change, paid };

        this.data.save({
            cart,
            bill,
            payment: this.payment.status
        });

        return this;
    };

    resetPos = () => {
        const { rowElements } = this.cart;
        const { billList } = this.bill;
        const alert = document.querySelector(".alert");

        rowElements.forEach(row => {
            document.querySelector("tbody").removeChild(row);
        });

        document.querySelector(".tools").removeChild(billList);

        alert && document.querySelector(".pos").removeChild(alert);

        this.clearPos();
    };

    alert() {
        new Alert();

        return this;
    }
}
