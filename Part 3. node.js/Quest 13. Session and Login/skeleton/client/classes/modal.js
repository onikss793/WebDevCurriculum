class Modal {
    constructor(setAllnotes) {
        this.setAllnotes = setAllnotes;
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

            const res = await this._fetchUserData();

            if (res.message === 'success') {
                this.setAllnotes(res.data);
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
            const id = this.idInput.value;
            const pw = this.pwInput.value;

            const response = await this._fetchLogin(id, pw);

            if (response.message === 'success') {
                this.close();
                this.accountStatus.login();
                this._saveUsername(response.data.username);
            }
        } catch (err) {
            console.log(err);
        }
    };

    _saveUsername = value => {
        sessionStorage.setItem('username', value);
        document.querySelector('.username').textContent = value;
    };

    _fetchUserData = async () => {
        return await fetch('http://localhost:8080/account/data').then(res =>
            res.json()
        );
    };

    _fetchLogin = async (id, pw) => {
        return await fetch('http://localhost:8080/account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ id, pw })
        }).then(res => res.json());
    };

    update = () => {};
}
