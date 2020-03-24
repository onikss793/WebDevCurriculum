class Pad {
    constructor() {}

    createPad() {
        const pad = new Node();
        this.element = pad.createNode('pad-template', 'board', 'pad');
    }

    createEvent = content => {
        this.element.addEventListener('input', e => {
            e.preventDefault();
            content.type('body', e.target.value, this.element);
        });
    };
}
