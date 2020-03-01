class Calculator {
    constructor(calcToBill) {
        this.screen = 0;
        this.calcToBill = calcToBill;
        this.createCalc();
        this.printScreen();
        this.addClickEvent();
    }

    createCalc() {
        this.calc = new Template()
            .cloneTemplate("calc-template")
            .appendTemplate("calc")
            .getElement("calc");
    }

    addClickEvent() {
        const pads = Array.from(this.calc.querySelectorAll(".pad"));

        pads.forEach(pad =>
            pad.addEventListener("click", event => {
                this.verifyPad(event);
                this.printScreen();
            })
        );
    }

    verifyPad(event) {
        const content = event.target.textContent;

        if (isNaN(Number(content))) {
            content === "입력" &&
                this.screen !== 0 &&
                this.calcToBill(this.screen);

            this.setScreen(0);
        } else {
            this.screen === 0
                ? this.setScreen(content)
                : this.setScreen(this.screen + content);
        }
    }

    printScreen() {
        this.calc.querySelector(".calc-screen").textContent = this.screen;
    }

    setScreen(number) {
        this.screen = Number(number);
    }
}
