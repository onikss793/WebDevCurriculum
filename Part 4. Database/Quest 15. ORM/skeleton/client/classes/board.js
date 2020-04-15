class Board {
    constructor() {}

    createBoard() {
        this.element = new Node().createNode(
            'board-template',
            'notepad',
            'board'
        );
    }
}
