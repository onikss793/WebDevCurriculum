class Template {
    constructor() {}

    createTemplate(templateName) {
        const template = document.querySelector('.' + templateName);
        const clonedTemp = template.content.cloneNode(true);
        this.clonedTemp = clonedTemp;
    }

    appendTemplate(className) {
        const target = document.querySelector('.' + className);
        target.appendChild(this.clonedTemp);
    }

    getElement(target) {
        const elements = document.querySelectorAll('.' + target);

        return elements[elements.length - 1];
    }
}

class Node extends Template {
    constructor() {
        super();
    }

    createNode = (templateName, className, target) => {
        super.createTemplate(templateName);
        super.appendTemplate(className);

        return super.getElement(target);
    };
}
