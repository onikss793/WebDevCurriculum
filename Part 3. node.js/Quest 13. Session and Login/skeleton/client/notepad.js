class Notepad {
    /* TODO: 그 외에 또 어떤 클래스와 메소드가 정의되어야 할까요? */
    constructor() {
        this.notes = [];
        this._createTools();
        this._createBoard();
        this._createTabs();
        this._setAccountStatus();
        this._createEvents();
        this._createAccount();
        !this.accountStatus.isLoggedIn && this._createModal();
        this._setUsername();
    }

    getAllNotes = () => this.notes.map(note => note.getNote());

    setAllNotes = noteData => {
        noteData.forEach(data => {
            this.createNote(null, data);
        });
    };

    createNote = (event, data) => {
        const content = new Content();
        const pad = this._createPad();
        const tab = this._createTab();
        const note = new Note(
            tab,
            pad,
            content,
            data,
            this.closeEvent,
            this.selectEvent
        );

        this.notes.push(note);
    };

    close = noteClass => {
        this.notes = this.notes.filter(note => note !== noteClass);
        this.closeEvent.removeSubject(noteClass);
        this.selectEvent.removeSubject(noteClass);
    };

    _createTools() {
        this.tools = new Tools();
        this.tools.createTools();
        this.tools.addEvent(this.createNote);
    }

    _createBoard() {
        new Board().createBoard();
    }

    _createTabs() {
        this.tabs = new Tabs().createTabs();
    }

    _setAccountStatus = () => {
        this.accountStatus = new AccountStatus();
    };

    _createEvents = () => {
        this.closeEvent = new CloseEvent();
        this.typeEvent = new TypeEvent();
        this.submitEvent = new SubmitEvent();
        this.selectEvent = new SelectEvent();

        this.closeEvent.addSubject(this);
    };

    _createAccount() {
        this.account = new Account(this._createModal, this.getAllNotes);
        this.account.setEvents(this.submitEvent, this.accountStatus);
        this.account.element.addEventListener(
            'click',
            this.account.handleSubmit
        );
    }

    _createModal = () => {
        this.modal = new Modal(this.setAllNotes);

        this.modal.createModal();
        this.modal.setEvents(
            this.typeEvent,
            this.submitEvent,
            this.accountStatus
        );

        this.modal.closeBtn.addEventListener('click', this.modal.close);
        this.modal.idInput.addEventListener('input', e => {
            e.preventDefault();
            this.modal.typeEvent.type(e, 'idInput');
        });
        this.modal.pwInput.addEventListener('input', e => {
            e.preventDefault();
            this.modal.typeEvent.type(e, 'pwInput');
        });
        this.modal.submitBtn.addEventListener(
            'click',
            this.modal.submitEvent.submit
        );
    };

    _setUsername = () => {
        const username = sessionStorage.getItem('username');
        document.querySelector('.username').textContent = username;
    };

    _createTab() {
        const tab = new Tab(this.selectEvent);
        tab.createTab();

        return tab;
    }

    _createPad() {
        const pad = new Pad(this.selectEvent);
        pad.createPad();

        return pad;
    }
}

class Note {
    constructor(tab, pad, content, data, closeEvent, selectEvent) {
        this.content = content;
        this.tab = tab;
        this.pad = pad;
        this.data = data;
        this.closeEvent = closeEvent;
        this.selectEvent = selectEvent;
        this._setEvents();
        this._execute();
    }

    getNote = () => {
        const title = this.tab.getElement().value;
        const body = this.pad.getElement().value;
        const cursor = this.pad.element.selectionStart;
        const selected = this._checkSelected();

        return { title, body, cursor, selected };
    };

    close = note => {
        if (this === note) {
            this.tab.element.parentNode.remove();
            this.pad.element.remove();
            this.closeEvent.removeSubject(this);
        }
    };

    _setEvents = () => {
        this.selectEvent.addSubject(this.tab);
        this.selectEvent.addSubject(this.pad);
        this.closeEvent.addSubject(this);
    };

    _execute = () => {
        this.tab.element.addEventListener('click', () => {
            this._setSelected();
            this.selectEvent.select(this.tab, this.pad);
            this._resetSelected();
        });

        this.tab.closeBtn.addEventListener('click', e => {
            this.closeEvent.close(this);
        });

        this._loadData();
        this._focusAndSetCursor();
    };

    _checkSelected = () => {
        const tabs = [...this.tab.element.parentElement.classList];

        if (tabs.includes('tab-selected')) {
            return true;
        } else {
            return false;
        }
    };

    _getCursor = () => {
        if (this.data) {
            return this.data.cursor;
        } else {
            return 0;
        }
    };

    _loadData = () => {
        if (this.data) {
            Object.keys(this.data).forEach(key => {
                let element = this._getElementFromKey(key);

                element && this.content.type(key, this.data[key], element);
            });
        }
    };

    _focusAndSetCursor = () => {
        if (this.data && this.data.selected) {
            this.tab.element.click();
            this.pad.element.focus();
            this.pad.element.selectionStart = this._getCursor();
            this.pad.element.selectionEnd = this._getCursor();
        } else if (this.data && !this.data.selected) {
            this.pad.element.classList.add('hidden');
        }
    };

    _setSelected = () => (this.selected = true);

    _resetSelected = () => (this.selected = false);

    _getElementFromKey = key => {
        if (key === 'title') return this.tab.element;
        if (key === 'body') return this.pad.element;
        else return;
    };
}
