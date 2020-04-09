class Account {
    constructor(createModal, getAllNotes) {
        this.element = document.querySelector('.account');
        this.createModal = createModal;
        this.getAllNotes = getAllNotes;
        this.API = new Api();

        this._renderText();
    }

    setEvents = (submitEvent, accountStatus) => {
        this.accountStatus = accountStatus;
        this.accountStatus.addSubject(this);

        this.submitEvent = submitEvent;
        this.submitEvent.addSubject(this);
    };

    submit = async () => {
        this._renderText();
    };

    update = () => {
        this._renderText();
    };

    handleSubmit = async () => {
        try {
            this._setStatus();

            if (this.isLoggedIn) {
                this.API.uploadNotesInProcess(this.getAllNotes());

                const result = await this.API.logout();

                if (result.message === 'success') {
                    alert('성공적으로 로그아웃 했습니다.');
                    this.submitEvent.isLoggedIn = false;
                    this._renderText();
                    this.accountStatus.logout();
                    sessionStorage.clear();
                    window.location.reload();
                }
            } else {
                this.createModal();
            }
        } catch (err) {
            console.log(err);
        }
    };

    _renderText = () => {
        this._setStatus();

        if (this.isLoggedIn) {
            this.element.textContent = '로그아웃';
        } else {
            this.element.textContent = '로그인';
        }
    };

    _setStatus = () => {
        this.isLoggedIn = this._getCookie().isLoggedIn || false;
    };

    _getCookie = () => {
        return document.cookie
            .split(';')
            .map((el) => {
                const arr = el.trim().split('=');

                return { [arr[0]]: arr[1] };
            })
            .reduce((acc, curr) => ({ ...acc, ...curr }));
    };
}
