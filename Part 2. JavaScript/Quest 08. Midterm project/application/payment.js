class Payment {
    constructor(sendStatus) {
        this.sendStatus = sendStatus;
        this.setStatus();
        this.addClickEvent();
    }

    addClickEvent() {
        const statusList = ["card", "cash", "cancel"];

        statusList.forEach(status => {
            const element = document.querySelector(`.${status}`);

            element.addEventListener("click", event =>
                this.handleStatus(event)
            );
        });
    }

    handleStatus(event) {
        this.setStatus(event.target.className);
        this.sendStatus(this.status);
    }

    setStatus(status = "cash") {
        this.status = status;
    }
}
