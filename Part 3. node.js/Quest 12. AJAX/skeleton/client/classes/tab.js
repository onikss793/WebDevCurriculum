class Tab {
    constructor() {}

    createTab() {
        const tab = new Node();
        this.element = tab.createNode('tab-template', 'tabs', 'tab');
    }

    createEvent = (selectTab, content) => {
        this.element.addEventListener('click', e => selectTab(e));
        this.element.addEventListener('input', e => {
            e.preventDefault();
            content.type('title', e.target.value, this.element);
        });
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
