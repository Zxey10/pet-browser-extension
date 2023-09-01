let active = false;

function makeOrange(color: string): void {
    const divs = document.querySelectorAll('div')
    divs?.forEach(div => {
        div.style.background = 'red'
    })

}

chrome.action.onClicked.addListener((tab) => {
    active = !active;
    const color = active ? 'orange' : 'orange';
    chrome.scripting.executeScript({
        target: {tabId: tab.id ? tab.id : -1},
        func: makeOrange,
        args: [color]
    }).then(() => {});
});