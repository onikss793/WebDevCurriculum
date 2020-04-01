class Tools {
    constructor() {}

    createTools() {
        const tools = new Node();
        this.element = tools.createNode('tools-template', 'notepad', 'tools');
    }

    addEvent = addNewFile => {
        this.newFile = new NewFile(addNewFile);
        this.saveFile = new SaveFile();
        this.loadFile = new LoadFile(addNewFile);
    };
}

class NewFile {
    constructor(addNewFile) {
        this.newFile = document.querySelector('.new-file');
        this.addNewFile = addNewFile;

        this.addEvent();
    }

    addEvent = () => {
        this.newFile.addEventListener('click', this.addNewFile);
    };
}

class SaveFile {
    constructor() {
        this.saveFile = document.querySelector('.save');

        this.addEvent();
    }

    addEvent = () => {
        this.saveFile.addEventListener('click', this._save);
    };

    _save = e => {
        const title = document.querySelector('.tab-selected').firstElementChild
            .value;
        const body = document.querySelector('.pad-selected').value;

        const data = { title, body };

        this._postFile(data);
    };

    async _postFile(data) {
        try {
            const response = await fetch('http://localhost:8080/memo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => res.json());

            this._reactToResponse(response);
        } catch (err) {
            console.log('ERROR: ', err.message);
        }
    }

    _reactToResponse(response) {
        response.message === 'success'
            ? alert('Successfully Saved')
            : alert(`Error: ${response.message}`);
    }
}

class LoadFile {
    constructor(addNewFile) {
        this.loadFile = document.querySelector('.load');
        this.addNewFile = addNewFile;

        this.addEvent();
    }

    addEvent = () => {
        this.loadFile.addEventListener('click', this._loadAll);
    };

    _loadAll = e => {
        e.preventDefault();

        this._getFiles();
    };

    _getFiles = async () => {
        try {
            const response = await fetch('http://localhost:8080/memo', {
                method: 'GET'
            }).then(res => res.json());

            if (this._checkResposne(response)) {
                let text = this._listUpFiles(response);
                const answer = prompt(text);

                if (answer) {
                    const response = await this._getFile(answer);

                    !response.error && this.addNewFile(event, response.data);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    _checkResposne = response => response.message === 'success';

    _listUpFiles(response) {
        let text = '불러올 파일의 번호를 입력하세요 \n';

        response.data.forEach(res => {
            const id = res.id;

            text += id + ': ' + res.title + ' \n';
        });

        return text;
    }

    _getFile = async id => {
        const fileId = this._renderId(id);

        return await fetch('http://localhost:8080/memo/' + fileId).then(res =>
            res.json()
        );
    };

    _renderId = string => {
        return string.replace(/.json/gi, '');
    };
}
