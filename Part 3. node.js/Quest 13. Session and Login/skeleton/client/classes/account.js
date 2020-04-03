class Account {
    constructor(createModal, getAllNotes) {
        this.element = document.querySelector('.account');
        this.createModal = createModal;
        this.getAllNotes = getAllNotes;

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
                this._postUserData();
                const result = await this._fetchLogout();

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

    _postUserData = async () => {
        const body = JSON.stringify(this.getAllNotes());

        return await fetch('http://localhost:8080/account/data', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body
        });
    };

    _fetchLogout = async () => {
        try {
            return await fetch('http://localhost:8080/account').then(res =>
                res.json()
            );
        } catch (err) {
            console.log(err);
            return err;
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
            .map(el => {
                const arr = el.trim().split('=');

                return { [arr[0]]: arr[1] };
            })
            .reduce((acc, curr) => ({ ...acc, ...curr }));
    };
}
