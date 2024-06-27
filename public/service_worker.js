// chrome.windows.onFocusChanged.addListener(windowId => {
//     if (windowId !== chrome.windows.WINDOW_ID_NONE) {
//       chrome.tabs.query({ active:true}, tabs => {
//         console.log(tabs);
//         if (tabs.length > 0) {
//           chrome.scripting.executeScript({
//             target: { tabId: tabs[0].id },
//             files: ['content.js']
//           });
//         }
//       });
//     }
//   });

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.message === 'get_tabs') {
      
        chrome.tabs.query({}, (tabs) => {
            
            sendResponse({ tabs: tabs });
        });
        return true; // Keep the message channel open for sendResponse
    } else if (request.message === 'open_new_tab') {
        const url = request.windowId;
        const leftPx = request.left - Math.round(request.left * (1 / 100)) - 307;
        let left = 0;
        const top = Math.round(request.top * (10 / 100));
        let width = 600;
        if(leftPx-width<0){
            width = width -left -30;
        }  
        else{
            left = leftPx - width-50;
        }
        chrome.windows.create({
            height:600,
            width:width,
            top:top,
            left:left,
            url: url,
        },function(windows){
           
        })
        
        return true;
    }
    else if(request.message === 'close_new_tab'){
        const tabId = request.tabId;
        console.log(tabId);
        chrome.tabs.remove(tabId, function() {
            console.log('Tab removed successfully');
        });
    }
    else if(request.message === "screenshotTab") {
                
        const url = request.windowId;
        const leftPx = request.left - Math.round(request.left * (1 / 100)) - 350;
        let left = 0;
        const top = Math.round(request.top * (10 / 100));
        let width = 600;
        if(leftPx-width<0){
            width = width -left -30;
        }  
        else{
            left = leftPx - width-50;
        }
        chrome.windows.create({
            height:600,
            width:width,
            top:top,
            left:left,
            url: url,
        },function(windows){
            sendResponse({window: windows.id});
        })
        
        return true;
               
        }
        else if(request.message === "close_window"){
                    
            const windowId = request.windowId;
            console.log(windowId);
            chrome.windows.get(windowId, function(window) {
              if (window) {
                chrome.windows.remove(windowId, function() {
                  console.log('window removed successfully');
                });
              } else {
                console.log('window not found');
              }
            });
            
            return true;
                   
        }
});
