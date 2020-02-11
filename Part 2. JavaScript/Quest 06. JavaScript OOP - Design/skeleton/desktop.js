class Desktop {
  /* TODO: Desktop 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  constructor(icons, folders) {
    Array.from(new Array(icons)).forEach(icon => new Icon(setIcons(), "icon"));
    Array.from(new Array(folders)).forEach(
      folder => new Folder(setIcons(), "folder")
    );
  }
}

class Icon {
  /* TODO: Icon 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  constructor(position, type) {
    this.icon = createElement(type);
    this.icon.addEventListener("mousedown", this.mouseDown);
    this.icon.addEventListener("mousemove", this.mouseMove);
    this.icon.addEventListener("mouseup", this.mouseUp);
    this.isDragged = false;
    this.position = position;
    this.setPosition(this.position[0], this.position[1]);
  }

  mouseMove = e => {};

  mouseUp = e => {};

  mouseDown = e => {};

  setPosition = (x, y) => {
    this.icon.style.left = parseInt(x) + "px";
    this.icon.style.top = parseInt(y) + "px";
  };
}

class Folder extends Icon {
  /* TODO: Folder 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  constructor(position, type) {
    super(position, type);
    this.icon.addEventListener("dblclick", this.hadleDbClick);
  }

  hadleDbClick = e => {
    this.openWindow();
  };

  openWindow() {
    new Window(setIcons(), "window");
  }
}

class Window extends Icon {
  /* TODO: Window 클래스는 어떤 멤버함수와 멤버변수를 가져야 할까요? */
  constructor(position, type) {
    super(position, type);
  }
}

function createElement(className) {
  const el = document.createElement("div");
  el.classList.add(className);
  // el.setAttribute("draggable", "true");
  document.querySelector(".desktop").appendChild(el);

  return el;
}

function setIcons() {
  const w = Math.random() * (window.innerWidth - 100) + 0;
  const h = Math.random() * (window.innerHeight - 100) + 0;

  return [w, h];
}
