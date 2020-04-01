class Board {
    constructor() {}

    createBoard() {
        const template = new Template();
        template.createTemplate('board-template');
        template.appendTemplate('notepad');
    }
}
