class Tab {
    constructor(selectEvent) {
        this.selectEvent = selectEvent;
    }

    getElement = () => this.element;

    createTab() {
        const tab = new Node();
        this.element = tab.createNode('tab-template', 'tabs', 'tab');
        this.closeBtn = this.element.nextElementSibling;
    }

    createEvent = (selectTab, content, closeTab) => {
        this.element.addEventListener('input', e => {
            e.preventDefault();
            content.type('title', e.target.value, this.element);
        });
    };

    select = () => {
        this.selectEvent.tab === this
            ? this.element.parentNode.classList.add('tab-selected')
            : this.element.parentNode.classList.remove('tab-selected');
    };
}

class Tabs {
    constructor() {
        this.list = [];
    }

    createTabs() {
        const tabs = new Node();
        this.element = tabs.createNode('tabs-template', 'board', 'tabs');
    }

    appendTab(tab) {
        this.list.push(tab);
    }
}
