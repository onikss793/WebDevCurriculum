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
        this.saveFile.addEventListener('click', this.save);
    };

    save = e => {
        e.preventDefault();

        const title = document.querySelector('.tab-selected').textContent;
        const body = document.querySelector('.pad-selected').textContent;

        const data = { title, body };

        this.postFile(data);
    };

    async postFile(data) {
        try {
            const response = await fetch('http://localhost:8080/memo', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }).then(res => res.json());

            this.reactToResponse(response);
        } catch (err) {
            console.log('ERROR: ', err.message);
        }
    }

    reactToResponse(response) {
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
        this.loadFile.addEventListener('click', this.loadAll);
    };

    loadAll = e => {
        e.preventDefault();

        this.getFiles();
    };

    getFiles = async () => {
        try {
            const response = await fetch('http://localhost:8080/memo', {
                method: 'GET'
            }).then(res => res.json());

            if (this.checkResposne(response)) {
                let text = this.listUpFiles(response);

                const answer = prompt(text);

                if (answer) {
                    const file = await this.getFile(answer);

                    this.addNewFile(event, file.data);
                }
            }
        } catch (err) {
            console.error(err);
        }
    };

    checkResposne(response) {
        return response.message === 'success';
    }

    listUpFiles(response) {
        let text = '불러올 파일을 입력하세요 \n';

        response.data.forEach(res => {
            text += res.title + '.txt' + '\n';
        });

        return text;
    }

    getFile = name => {
        const fileName = this.renderTitle(name);

        return fetch('http://localhost:8080/memo?name=' + fileName).then(res =>
            res.json()
        );
    };

    renderTitle = string => {
        return (
            string
                // .split(' ')
                // .join('')
                .replace(/.txt/gi, '')
        );
        // .toLowerCase();
    };
}
