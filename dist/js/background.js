"use strict";
let active = false;
function makeOrange(color) {
    const divs = document.querySelectorAll('div');
    divs === null || divs === void 0 ? void 0 : divs.forEach(div => {
        div.style.background = 'red';
    });
}
chrome.action.onClicked.addListener((tab) => {
    active = !active;
    const color = active ? 'orange' : 'orange';
    chrome.scripting.executeScript({
        target: { tabId: tab.id ? tab.id : -1 },
        func: makeOrange,
        args: [color]
    }).then(() => { });
});
//# sourceMappingURL=background.js.map