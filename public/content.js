document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'v') {
        const existingPopup = document.getElementById('site-change-popup');
        
        if (existingPopup) {
            document.body.removeChild(existingPopup);
        } else {
            chrome.runtime.sendMessage({ message: 'get_tabs' }, function(response) {
                const tabs = response.tabs;
                console.log("hello");
                const popup = document.createElement('div');
                popup.id = 'site-change-popup';
                popup.style.setProperty('position', 'fixed', 'important');
                popup.style.setProperty('top', '0px', 'important');
                popup.style.setProperty('right', '10px', 'important');
                popup.style.setProperty('background-color', '#1C232C', 'important');
                popup.style.setProperty('color', 'white', 'important');
                popup.style.setProperty('border', '1px solid black', 'important');
                popup.style.setProperty('padding', '10px', 'important');
                popup.style.setProperty('z-index', '10000', 'important');
                popup.style.setProperty('display', 'flex', 'important');
                popup.style.setProperty('flex-direction', 'column', 'important');
                popup.style.setProperty('gap', '10px', 'important');
                popup.style.setProperty('width', '300px', 'important');

                // Add a message to the popup
                const message = document.createElement('p');
                message.style.color = "white";
                message.innerText = 'You have the following tabs opened:';
                popup.appendChild(message);

                //tabs.sort((a, b) => a.url.localeCompare(b.url));
                tabs.forEach(tab => {
                    const wrapper = document.createElement("div");
                    wrapper.style.setProperty('display', 'flex', 'important');
                   // wrapper.style.setProperty('align-items', 'center', 'important');
                   wrapper.style.setProperty('justify-content', 'space-between', 'important');
                    wrapper.style.setProperty('background-color', '#1C232C', 'important');
                    wrapper.style.setProperty('padding', '0px', 'important');
                    wrapper.style.setProperty('margin', '0px', 'important');
                    wrapper.style.setProperty('width', '290px', 'important');
                    
                    const wrapperClick = (tabUrl,tabId)=>{
                        chrome.runtime.sendMessage({ message: 'open_new_tab', id: tabId, url: tabUrl });   
                    }
                    console.log(tab);
                    const label = document.createElement("label");
                    label.addEventListener('click', function() {
                        wrapperClick(tab.url,tab.Id); // Pass your arguments here
                    });
                    label.textContent = tab.title? tab.title : tab.url;
                    label.style.setProperty('background-color', '#1C232C', 'important');
                    label.style.setProperty('color', 'white', 'important');

                    const btn = document.createElement("button");
                    btn.textContent = "close";
                    btn.style.setProperty('width', '30px', 'important');
                    
                    btn.addEventListener('click', function() {
                        closeTabFunc(tab.Id); // Pass your arguments here
                    });

                    const closeTabFunc = (tabId)=>{
                        event.stopPropagation(); // Prevent the wrapper click event from firing
                        console.log(tabId);
                        chrome.runtime.sendMessage({ message: 'close_new_tab', tabId: tab.Id});
                    }
                    
                    // const link = document.createElement("a");
                    // link.textContent = tab.url;
                    // link.href = tab.url;
                    // link.target = '_blank'; // Open link in a new tab
                    // link.style.color = 'white'; // Optional: Make the link blue
                    // link.style.textDecoration = 'underline'; // Optional: Underline the link
                    wrapper.append(label);
                    wrapper.append(btn);

                    popup.appendChild(wrapper);
                });

                document.body.appendChild(popup);
            });
        }
    }
});
