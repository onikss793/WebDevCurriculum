class Content {
    constructor() {}

    setText = type => {
        this[type] = '';

        return type;
    };

    updateValue = (type, text) => {
        this[type] = text;
    };

    getValue = type => {
        return this[type];
    };

    type = (type, text, element) => {
        this.setText(type);
        this.updateValue(type, text);
        element.value = this.getValue(type);
        element.textContent = this.getValue(type);
    };
}
