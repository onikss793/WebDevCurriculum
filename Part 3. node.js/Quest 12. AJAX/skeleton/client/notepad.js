class Notepad {
    /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
    constructor() {
        this.notes = [];

        this.createTools();
        this.createBoard();
        this.createTabs();

        this.createNote();
    }

    createBoard() {
        this.board = new Board();
        this.board.createBoard();
    }

    createTools() {
        this.tools = new Tools();
        this.tools.createTools();
        this.tools.addEvent(this.createNote);
    }

    createTabs() {
        this.tabs = new Tabs();
        this.tabs.createTabs();
    }

    createNote = (event, data) => {
        const content = new Content();
        const pad = this.createPad();
        const tab = this.createTab();
        const note = new Note(tab, pad, content, data);

        note.selectTab();

        this.notes.push(note);
    };

    createTab() {
        const tab = new Tab();
        tab.createTab();

        this.tabs.appendTab(tab);

        return tab;
    }

    createPad() {
        const pad = new Pad();
        pad.createPad();

        return pad;
    }
}

class Note {
    constructor(tab, pad, content, data) {
        this.content = content;
        this.tab = tab;
        this.pad = pad;
        this.data = data;

        this.loadData();

        this.tab.createEvent(this.selectTab, this.content);
        this.pad.createEvent(this.content);
    }

    loadData() {
        if (this.data) {
            Object.keys(this.data).forEach(key => {
                let element;

                if (key === 'title') {
                    element = this.tab.element;
                } else if (key === 'body') {
                    element = this.pad.element;
                }

                this.content.type(key, this.data[key], element);
            });
        }
    }

    selectTab = () => {
        const tabs = [...document.querySelectorAll('.tab')];

        tabs.forEach(tab => {
            if (tab === this.tab.element) {
                tab.classList.add('tab-selected');
            } else {
                tab.classList.remove('tab-selected');
            }
        });

        this.selectPad();
    };

    selectPad = () => {
        const pads = [...document.querySelectorAll('.pad')];

        pads.forEach(pad => {
            if (pad === this.pad.element) {
                pad.classList.remove('hidden');
                pad.classList.add('pad-selected');
            } else {
                pad.classList.remove('pad-selected');
                pad.classList.add('hidden');
            }
        });
    };
}
