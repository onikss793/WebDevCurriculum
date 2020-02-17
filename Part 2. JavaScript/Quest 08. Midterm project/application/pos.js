class Pos {
    constructor() {
        this.startPos();
        this.readyPos();
        this.loadPos();
        this.eventSetUp();
    }

    startPos() {
        new Template().cloneTemplate("pos-template").appendTemplate("pos");
    }

    readyPos() {
        this.cart = new Cart();
        this.bill = new Bill(this.endPay);
        this.bill.getData();
    }

    loadPos() {
        this.data = new Data();
        this.menuBoard = new MenuBoard(this.data.menu);
        this.calculator = new Calculator(this.calcToBill);
        this.payment = new Payment(this.sendStatus);
    }

    eventSetUp() {
        this.menuBoard.addClickEvent((event, productData) =>
            this.cartToBill(event, productData)
        );
    }

    cartToBill = (event, productData) => {
        this.cart.addToCart(event, productData);
        this.bill.getData(this.cart.sendData());
    };

    calcToBill = money => {
        this.bill.pay(money);
    };

    sendStatus = status => {
        if (status === "cancel") {
            this.resetPos();
        } else if (status === "card") {
            this.payment.setStatus("card");
            this.bill.pay(this.bill.toPay);
        }
    };

    endPay = () => {
        new Alert();
        this.saveData();

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

        this.readyPos();
    };
}
