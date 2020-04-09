class Api {
    constructor() {}

    login = async (username, pw) => {
        try {
            const body = JSON.stringify({ username, pw });

            return await fetch('http://localhost:8080/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            }).then((res) => res.json());
        } catch (err) {
            console.log('Log In Error: ', err);
        }
    };

    logout = async () => {
        try {
            return await fetch('http://localhost:8080/user').then((res) =>
                res.json()
            );
        } catch (err) {
            console.log('Logout Error: ', err);
        }
    };

    uploadNotesInProcess = async (notes) => {
        try {
            const body = JSON.stringify(notes);

            return await fetch('http://localhost:8080/note?in_process=true', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body,
            });
        } catch (err) {
            console.log('Upload Notes In Process Error: ', err);
        }
    };

    loadNotesInProcess = async () => {
        try {
            return await fetch(
                'http://localhost:8080/note?in_process=true'
            ).then((res) => res.json());
        } catch (err) {
            console.log('Load Notes In Process Error: ', err);
        }
    };

    saveNote = async (data) => {
        try {
            return await fetch('http://localhost:8080/note', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            }).then((res) => res.json());
        } catch (err) {
            console.log('Save Note Error: ', err);
        }
    };

    getNotesList = async () => {
        try {
            return await fetch('http://localhost:8080/note', {
                method: 'GET',
            }).then((res) => res.json());
        } catch (err) {
            console.log('Get Note List Error: ', err);
        }
    };

    getNote = async (id) => {
        try {
            return await fetch('http://localhost:8080/note/' + id).then((res) =>
                res.json()
            );
        } catch (err) {
            console.log('Get Note Error: ', err);
        }
    };
}
