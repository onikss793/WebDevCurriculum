class Modal {
    constructor(setAllnotes) {
        this.setAllnotes = setAllnotes;
        this.API = new Api();
    }

    createModal = () => {
        const modal = new Node();
        this.element = modal.createNode('modal-template', 'body', 'modal');
        this.background = document.querySelector('.modal-background');
        this.closeBtn = document.querySelector('.modal-close');
        this.idInput = document.querySelector('.id');
        this.pwInput = document.querySelector('.password');
        this.submitBtn = document.querySelector('.login');
    };

    setEvents = (typeEvent, submitEvent, accountStatus) => {
        this.accountStatus = accountStatus;
        this.accountStatus.addSubject(this);

        this.typeEvent = typeEvent;
        this.typeEvent.addSubject(this);

        this.submitEvent = submitEvent;
        this.submitEvent.addSubject(this);
    };

    close = async () => {
        try {
            this.background.remove();
            this.element.remove();
            this.submitEvent.removeSubject(this);

            // const res = await this._fetchUserData();
            const response = await this.API.loadNotesInProcess();

            if (response.message === 'success') {
                this.setAllnotes(response.data);
            }
        } catch (err) {
            console.log(err);
        }
    };

    type = () => {
        this.idInput.value = this.typeEvent.idInput || '';
        this.pwInput.value = this.typeEvent.pwInput || '';
    };

    submit = async () => {
        try {
            const username = this.idInput.value;
            const pw = this.pwInput.value;
            const response = await this.API.login(username, pw);

            if (response.message === 'success') {
                this.close();
                this.accountStatus.login();
                this._saveUsername(response.data.username);
            }
        } catch (err) {
            console.log(err);
        }
    };

    _saveUsername = (value) => {
        sessionStorage.setItem('username', value);
        document.querySelector('.username').textContent = value;
    };

    update = () => {};
}
