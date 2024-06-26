chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_tabs') {
      
        chrome.tabs.query({}, (tabs) => {
            
            sendResponse({ tabs: tabs });
        });
        return true; // Keep the message channel open for sendResponse
    } else if (request.message === 'open_new_tab') {
        const { id, url } = request;
        
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
        else if(request.message === "screenshotTab")
            {
                
                const url = request.windowId;
        
                chrome.windows.create({
                    height:600,
                    width:800,
                    url: url,
                },function(windows){
                    sendResponse({window: windows.id});
                })
                
                return true;
               
            }
            else if(request.message === "close_window")
                {
                    
                    const windowId = request.windowId;
                    console.log(windowId);
                    chrome.windows.remove(windowId, function() {
                        console.log('window removed successfully');
                    });
                    
                    return true;
                   
                }
});
