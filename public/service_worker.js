chrome.tabs.onUpdated.addListener(
    async function(tabId, changeInfo, tab){
        const tabs = await chrome.tabs.query({});
        if (changeInfo.status === 'complete') {
            chrome.scripting.executeScript({
                target: {tabId: tabId},
                args: [tabs],
                func:(tabs)=>{
                    console.log("hello");
                    const popup = document.createElement('div');
                    popup.id = 'site-change-popup';
                    popup.style.position = 'fixed';
                    popup.style.top = '0px';
                    popup.style.right = '10px';
                    popup.style.backgroundColor = '#1C232C';
                    popup.style.color = 'white';
                    popup.style.border = '1px solid black';
                    popup.style.padding = '10px';
                    popup.style.zIndex = '10000';
                    popup.style.display = 'flex';
                    popup.style.flexDirection = 'column';
                    popup.style.gap = '10px'; // Optional: Adds space between the items

                    // Add a message to the popup
                    const message = document.createElement('p');
                    message.innerText = 'You have the following tabs opened.';
                    popup.appendChild(message);
                    tabs.sort((a,b)=>a.url.localeCompare(b.url));
                    tabs.forEach(tab => {
                        const wrapper = document.createElement("div");
                        wrapper.style.display = 'flex';
                        wrapper.style.alignItems = 'center';
                        wrapper.style.padding = '0px';
                        wrapper.style.margin = '0px';
                        wrapper.style.width = "300px";
                        

                        const link = document.createElement("a");
                        link.textContent = tab.url;
                        link.href = tab.url;
                        link.target = '_blank'; // Open link in a new tab
                        link.style.color = 'white'; // Optional: Make the link blue
                        link.style.textDecoration = 'underline'; // Optional: Underline the link
                        wrapper.append(link);
                        popup.appendChild(wrapper);
                    });
                    document.body.appendChild(popup);
                }
            });
          }
    }
)