class Template {
    constructor() {}

    getElement(selector) {
        return document.querySelectorAll(`.${selector}`)[
            document.querySelectorAll(`.${selector}`).length - 1
        ];
    }

    cloneTemplate(template) {
        this.template = document
            .querySelector(`.${template}`)
            .content.cloneNode(true);

        return this;
    }

    appendTemplate(selector) {
        this.parent = document.querySelector(`.${selector}`);
        this.parent.appendChild(this.template);

        return this;
    }
}
