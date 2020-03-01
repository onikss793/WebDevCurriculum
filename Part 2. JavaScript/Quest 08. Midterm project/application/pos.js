class Pos {
    constructor() {
        this.startPos();
        this.loadPos();
        this.setDiscount();
        this.getReadyPos();
    }

    startPos() {
        this.pos = new Template()
            .cloneTemplate("pos-template")
            .appendTemplate("pos")
            .getElement("pos");
    }

    getReadyPos() {
        this.cart = new Cart(this.discount.checkDiscount);
        this.bill = new Bill(this.endPay);
    }

    loadPos() {
        this.data = new Data();
        this.menuBoard = new MenuBoard(this.data.menu, this.cartToBill);
        this.calculator = new Calculator(this.calcToBill);
        this.payment = new Payment(this.sendStatus);
        this.discountData = this.data.sendDiscountData();
    }

    cartToBill = productData => {
        this.cart.addToCart(productData);
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
            this.bill.pay(this.bill.toPay - this.bill.paid);
        }
    };

    setDiscount() {
        this.discount = new Discount();
        this.discount.setDiscountPolicy(this.discountData);
    }

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

        this.getReadyPos();
    };
}
