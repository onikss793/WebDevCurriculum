class Calculator {
    constructor() {
        this.screen = 0;

        this.createCalc().printScreen();
    }

    createCalc() {
        this.calc = new Template()
            .cloneTemplate("calc-template")
            .appendTemplate("calc")
            .getElement("calc");

        return this;
    }

    addClickEvent(sendToBill) {
        const pads = Array.from(this.calc.querySelectorAll(".pad"));

        pads.forEach(pad =>
            pad.addEventListener("click", event =>
                this.verifyPad(event, sendToBill).printScreen()
            )
        );

        return this;
    }

    printScreen() {
        this.calc.querySelector(".calc-screen").textContent = this.screen;

        return this;
    }

    verifyPad(event, sendToBill) {
        const content = event.target.textContent;

        if (isNaN(Number(content))) {
            content === "입력" && this.screen !== 0 && sendToBill(this.screen);

            this.setScreen(0);
        } else {
            this.screen === 0
                ? this.setScreen(content)
                : this.setScreen(this.screen + content);
        }

        return this;
    }

    setScreen(number) {
        this.screen = Number(number);
    }
}
