class Desktop {
    /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor(icons, folders) {
        this.createDesktop()
            .setDesktopId()
            .createIcons(icons)
            .createFolders(folders);
    }

    createDesktop = () => {
        const desktop = document
            .querySelector(".desktop-template")
            .content.cloneNode(true);
        document.querySelector("body").appendChild(desktop);

        return this;
    };

    setDesktopId = () => {
        this.desktopId = document.querySelectorAll(".desktop").length - 1;
        this.desktop = document.querySelectorAll(".desktop")[this.desktopId];
        this.desktop.id = `desktop${this.desktopId}`;

        return this;
    };

    createIcons = icons => {
        icons.forEach(icon => new Icon(icon, this.desktopId));

        return this;
    };

    createFolders = folders => {
        folders.forEach(folder => new Folder(folder, this.desktopId));

        return this;
    };
}

class Draggable {
    constructor() {
        this.isDraggable = false;
    }

    makeDraggable = element => {
        this.setElement(element).setEventListeners();

        return this;
    };

    setEventListeners = () => {
        this.element.addEventListener("mousedown", this.mouseDown);
        this.element.addEventListener("mousemove", this.mouseMove);
        this.element.addEventListener("mouseup", this.mouseUp);
        this.element.addEventListener("mouseout", this.mouseOut);

        return this;
    };

    setElement = element => {
        this.element = element;

        return this;
    };

    mouseMove = e => {
        e.preventDefault();
        const target = e.target;

        if (this.isDraggable) {
            this.setPosition({
                x: e.x - target.mouseMargin.x,
                y: e.y - target.mouseMargin.y
            });
        }
    };

    mouseUp = () => (this.isDraggable = false);

    mouseDown = e => {
        e.preventDefault();
        const target = e.target;

        target.mouseMargin = {
            x: e.clientX - target.getBoundingClientRect().left,
            y: e.clientY - target.getBoundingClientRect().top
        };

        this.isDraggable = true;
    };

    mouseOut = () => (this.isDraggable = false);

    setPosition = position => {
        this.element.style.left = position.x + "px";
        this.element.style.top = position.y + "px";

        this.position = {
            x: position.x,
            y: position.y
        };

        return this;
    };
}

class File extends Draggable {
    constructor(desktopId) {
        super();
        this.desktopId = desktopId;
    }

    createFile = (className, title) => {
        this.element = document.createElement("div");
        this.element.classList.add(className);

        document
            .getElementById(`desktop${this.desktopId}`)
            .appendChild(this.element);

        this.drawTitle(title);

        return this;
    };

    drawFile = (size, src, position) => {
        this.element.style.width = size.width + "px";
        this.element.style.height = size.height + "px";
        this.element.style.backgroundImage = `url(${src})`;

        return this;
    };

    drawTitle = title => {
        const titleDiv = document.createElement("div");
        titleDiv.className = "title";
        titleDiv.textContent = title;
        this.element.appendChild(titleDiv);
        this.title = title;

        return this;
    };
}

class Icon {
    /* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor(
        {
            position,
            type = "icon",
            size = { width: 50, height: 50 },
            src = "./file.png",
            title = ""
        },
        desktopId
    ) {
        this.createIcon(
            type,
            title,
            size,
            src,
            desktopId,
            position
        ).makeDraggable(this.icon.element);
    }

    createIcon = (type, title, size, src, desktopId, position) => {
        this.icon = new File(desktopId)
            .createFile(type, title)
            .drawFile(size, src)
            .setPosition(position);

        return this.icon;
    };
}

class Folder {
    /* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor(
        {
            position,
            type = "folder",
            size = { width: 50, height: 50 },
            src = "./folder.png",
            title = ""
        },
        desktopId
    ) {
        this.createFolder(
            type,
            title,
            size,
            src,
            desktopId,
            position
        ).makeDraggable(this.folder.element);

        this.folder.element.addEventListener("dblclick", () =>
            this.openWindow(desktopId, this.folder.title)
        );
    }

    createFolder = (type, title, size, src, desktopId, position) => {
        this.folder = new File(desktopId)
            .createFile(type, title)
            .drawFile(size, src)
            .setPosition(position);

        return this.folder;
    };

    openWindow = (desktopId, title) => {
        new Window({
            title,
            desktopId
        });
    };
}

class Window extends Draggable {
    /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
    constructor({
        position = { x: 500, y: 200 },
        size = { width: 700, height: 500 },
        title,
        desktopId
    }) {
        super();
        this.createWindow(size, title, desktopId)
            .makeDraggable(this.window, position)
            .enableClose();
    }

    createWindow = (size, title, desktopId) => {
        this.cloneTemplate()
            .appendWindow(desktopId)
            .setWindow()
            .drawWindow(size, title);

        return this;
    };

    makeDraggable = (element, position) => {
        this.setElement(element)
            .setPosition(position)
            .setEventListeners();

        return this;
    };

    cloneTemplate = () => {
        this.template = document
            .querySelector(".window-template")
            .content.cloneNode(true);

        return this;
    };

    setWindow = () => {
        const desktopWindows = this.desktop.querySelectorAll(".window");
        this.window = desktopWindows[desktopWindows.length - 1];

        return this;
    };

    appendWindow = desktopId => {
        this.desktop = document.getElementById(`desktop${desktopId}`);
        this.desktop.appendChild(this.template);

        return this;
    };

    drawTitle = title => {
        this.window.querySelector(".window-title").textContent = title;

        return this;
    };

    drawWindow = (size, title) => {
        this.window.style.width = size.width + "px";
        this.window.style.height = size.height + "px";

        this.drawTitle(title);

        return this;
    };

    enableClose = () => {
        this.window
            .querySelector(".window-close")
            .addEventListener("click", () => (this.window.className = "hide"));

        return this;
    };
}
