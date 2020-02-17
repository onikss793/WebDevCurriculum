class Payment {
    constructor() {
        this.setStatus();
    }

    addClickEvent(sendStatus) {
        const statusList = ["card", "cash", "cancel"];

        statusList.forEach(status => {
            const element = document.getElementsByClassName(status)[0];

            element.addEventListener("click", event =>
                this.handleClick(event, sendStatus)
            );
        });

        return this;
    }

    handleClick(event, sendStatus) {
        const status = event.target.className;

        this.setStatus(status);

        sendStatus(this.status);
    }

    setStatus(status = "cash") {
        this.status = status;

        return this;
    }
}
