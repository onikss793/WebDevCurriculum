class EventObserver {
    update() {}
}

class EventSubject {
    addEvent() {}
    removeSubject() {}
    notifyObservers() {}
}

class SubmitEvent extends EventSubject {
    constructor() {
        super();
        this.subjects = [];
    }

    addSubject = eventSubject => {
        this.subjects.push(eventSubject);
    };

    removeSubject = eventSubject => {
        this.subjects = this.subjects.filter(
            subject => subject !== eventSubject
        );
    };

    notifyObservers = async () => {
        for await (const eventSubject of this.subjects) {
            await eventSubject.submit();
        }
    };

    submit = () => {
        this.notifyObservers();
    };
}

class TypeEvent extends EventSubject {
    constructor() {
        super();
        this.subjects = [];
    }

    addSubject = eventSubject => {
        this.subjects.push(eventSubject);
    };

    removeSubject = eventSubject => {
        this.subjects = this.subjects.filter(
            subject => subject !== eventSubject
        );
    };

    notifyObservers = () => {
        this.subjects.forEach(eventSubject => eventSubject.type());
    };

    type = (e, key) => {
        const value = e.target.value;

        this[key] = value;
        this.notifyObservers();
    };
}

class CloseEvent extends EventSubject {
    constructor() {
        super();
        this.subjects = [];
    }

    addSubject = eventSubject => {
        this.subjects.push(eventSubject);
    };

    removeSubject = eventSubject => {
        this.subjects = this.subjects.filter(
            subject => subject !== eventSubject
        );
    };

    notifyObservers = note => {
        this.subjects.forEach(eventSubject => eventSubject.close(note));
    };

    close = note => {
        this.notifyObservers(note);
    };
}

class SelectEvent extends EventSubject {
    constructor() {
        super();
        this.subjects = [];
    }

    addSubject = eventSubject => {
        this.subjects.push(eventSubject);
    };

    removeSubject = eventSubject => {
        this.subjects = this.subjects.filter(
            subject => subject !== eventSubject
        );
    };

    notifyObservers = () => {
        this.subjects.map(subject => subject.select());
    };

    select = (tab, pad) => {
        this.tab = tab;
        this.pad = pad;
        this.notifyObservers();
    };
}

class AccountStatus {
    constructor() {
        this.subjects = [];
        this.isLoggedIn = this._getCookie().isLoggedIn;
    }

    addSubject = subject => {
        this.subjects.push(subject);
    };

    login = () => {
        this.isLoggedIn = true;
        this.update();
    };

    logout = () => {
        this.isLoggedIn = false;
        this.update();
    };

    update = () => {
        this.subjects.forEach(subject => subject.update());
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
