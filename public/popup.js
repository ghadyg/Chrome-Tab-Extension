document.addEventListener('DOMContentLoaded', () => {
    const openSettingsButton = document.getElementById('openSettingsButton');
    openSettingsButton.addEventListener('click', () => {
        chrome.tabs.create({
            url: chrome.runtime.getURL("index.html")
        });
    });
});
