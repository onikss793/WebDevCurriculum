class Pad {
    constructor(selectEvent) {
        this.selectEvent = selectEvent;
    }

    getElement = () => this.element;

    getCursor = () => this.element.selectionStart;

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

    select = () => {
        if (this.selectEvent.pad === this) {
            this.element.classList.add('pad-selected');
            this.element.classList.remove('hidden');
        } else {
            this.element.classList.add('hidden');
            this.element.classList.remove('pad-selected');
        }
    };
}
