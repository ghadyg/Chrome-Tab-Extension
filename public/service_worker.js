chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_tabs') {
      
        chrome.tabs.query({}, (tabs) => {
            
            sendResponse({ tabs: tabs });
        });
        return true; // Keep the message channel open for sendResponse
    } else if (request.message === 'open_new_tab') {
        const { id, url } = request;
        
        chrome.tabs.create({
            active: true,
            url: url
        }, (tab) => {});
        
        return true; // Keep the message channel open for sendResponse
    }
});
