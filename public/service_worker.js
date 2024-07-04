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
      try {
        chrome.tabs.query({}, (tabs) => {
            
            sendResponse({ tabs: tabs });
        });
      } catch (error) {
        console.log(error);
      }
        return true; // Keep the message channel open for sendResponse
    } else if (request.message === 'open_new_tab') {

        try {
            const url = request.windowId;
            const widthPopup = request.width;
            const leftPx = request.left;
            let left = 0;
            const top = Math.round(request.top * (10 / 100));
            let width = 600;
            if(leftPx-width<0){
                left = Math.round(leftPx + widthPopup + 50) ;
            }  
            else{
                left = Math.round(leftPx - width-50);
            }
            chrome.windows.create({
                height:600,
                width:width,
                top:top,
                left:left,
                url: url,
                focused:true
            },function(windows){
               
            })

        } catch (error) {
            console.log(error);
        }
       
        
        return true;
    }
    else if(request.message === 'close_new_tab'){
        try {
            const tabId = request.tabId;
            
            chrome.tabs.remove(tabId, function() {
            
        });
        } catch (error) {
            console.log(error);
        }
        

        return true;
    }
    else if(request.message === "screenshotTab") {
        
        try {
            const url = request.windowId;
            const widthPopup = request.width;
            const leftPx = request.left;
            let left = 0;
            const top = Math.round(request.top * (10 / 100));
            let width = 600;
            if(leftPx-width<0){
                left = Math.round(leftPx + widthPopup + 50) ;
            }  
            else{
                left = Math.round(leftPx - width-50);
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
        
        } catch (error) {
            console.log(error);
        }
        
        return true;
               
        }
        else if(request.message === "close_window"){
            try {
                const windowId = request.windowId;
                
                chrome.windows.get(windowId, function(window) {
                  if (window) {
                    chrome.windows.remove(windowId, function() {
                      console.log('window removed successfully');
                    });
                  } else {
                    console.log('window not found');
                  }
                });
            } catch (error) {
                console.log(error);
            }   
            
            
            return true;
                   
        }
        else if(request.message === "create-new-window"){
            try {
                chrome.tabs.create({
                    active: true
                })
            } catch (error) {
                console.log(error);
            }
            
            return true;
                   
        }
        else if(request.message === "switchToTab"){
            try {
                const id = request.tabId
                chrome.tabs.update(id, { active: true });
            } catch (error) {
                console.log(error);
            }

            return true;
        }
        else if(request.message === "laod-history"){
            try {
                const lastAccessed = request.lastAccessed;
                const tabCount = request.tabCount;
                console.log(request);
                if(lastAccessed){
                    chrome.history.search({
                        text: "",
                        maxResults: 5,
                        endTime: lastAccessed 
                    },function(tabs){
                        console.log(tabs);
                        sendResponse({ tabs: tabs });
                    })
                }
                else{
                    chrome.history.search({
                        text: "",
                        maxResults: 5+tabCount
                    },function(tabs){
                        console.log(tabs);
                        sendResponse({ tabs: tabs });
                    })
                }
            } catch (error) {
                console.log(error);
            }    
            
            return true;
                   
        }
});
