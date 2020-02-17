class Alert {
    constructor() {
        this.createAlert();
    }

    createAlert() {
        this.alert = new Template()
            .cloneTemplate("alert-template")
            .appendTemplate("pos")
            .getElement("alert");
    }
}
