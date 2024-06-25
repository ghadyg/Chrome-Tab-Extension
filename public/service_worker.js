chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_tabs') {
      
        chrome.tabs.query({}, (tabs) => {
            
            sendResponse({ tabs: tabs });
        });
        return true; // Keep the message channel open for sendResponse
    } else if (request.message === 'open_new_tab') {
        const { id, url } = request;
        
        // chrome.tabs.create({
        //     active: true,
        //     url: url,
        //     index: 0,
        //     windowId: chrome.windows.WINDOW_ID_CURRENT, 
        // }, () => {
        //     // chrome.tabs.remove(id, function() {
        //     //     console.log('Tab removed successfully');
        //     // });
        // });
        chrome.windows.create({
            height:600,
            width:800,
            url: url,
        },function(){
            console.log('New window created');
        })
        
        return true; // Keep the message channel open for sendResponse
    }
    else if(request.message === 'close_new_tab')
        {
            const tabId = request.tabId;
            console.log(tabId);
            chrome.tabs.remove(tabId, function() {
                console.log('Tab removed successfully');
            });
        }
});
