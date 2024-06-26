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
                popup.style.setProperty('padding', '1px', 'important');
                popup.style.setProperty('z-index', '10000', 'important');
                popup.style.setProperty('display', 'flex', 'important');
                popup.style.setProperty('flex-direction', 'column', 'important');
                popup.style.setProperty('gap', '10px', 'important');
                popup.style.setProperty('width', '330px', 'important');
                

                tabs.forEach((tab,index) => {
                    const wrapper = document.createElement("div");
                    wrapper.id = tab.id;
                    wrapper.style.setProperty('display', 'flex', 'important');
                    wrapper.style.setProperty('gap', '20px', 'important');
                    wrapper.style.setProperty('justify-content', 'space-between', 'important');
                    wrapper.style.setProperty('background-color', '#1C232C', 'important');
                    wrapper.style.setProperty('padding', '10px', 'important');
                    wrapper.style.setProperty('margin', '0px', 'important');
                    wrapper.style.setProperty('width', '310px', 'important');
                    
                    console.log(tabs.length-1);
                    console.log(index);
                    if(index !== tabs.length-1)
                        {
                            wrapper.style.setProperty('border-radius', '0', 'important');
                            wrapper.style.setProperty('border-bottom', '2px solid black', 'important');
                        }

                    const wrapperClick = (tabUrl,tabId)=>{
                        chrome.runtime.sendMessage({ message: 'open_new_tab', id: tabId, url: tabUrl });   
                    }
                    console.log(tab);
                    const wrapperLbl = document.createElement("div");
                    
                    wrapperLbl.style.setProperty('display', 'flex', 'important');
                    wrapperLbl.style.setProperty('background-color', '#1C232C', 'important');
                    wrapperLbl.style.setProperty('padding', '0px', 'important');
                    wrapperLbl.style.setProperty('margin', '0px', 'important');
                    wrapperLbl.style.setProperty('width', '260px', 'important');
                    
                    wrapperLbl.addEventListener('click', function() {
                        wrapperClick(tab.url,tab.id); // Pass your arguments here
                    });

                    


                    //adding the hover style for the wrapper
                    const style = document.createElement('style');

                    // Add CSS rules for hover
                    style.textContent = `
                        .hover-pointer:hover {
                            cursor: pointer !important;
                        }
                        .preview {
                          position: absolute;
                          left: -310px;
                          top: 0;
                          background-color: #1C232C;
                          border: 1px solid black;
                          padding: 10px;
                          width: 300px;
                          height: 300px;
                        }
                    `;

                    // Append the style element to the document head
                    document.head.appendChild(style);
                    wrapperLbl.classList.add("hover-pointer");




                    const label = document.createElement("label");
                    label.textContent = tab.title? tab.title : tab.url;
                    label.style.setProperty('background-color', '#1C232C', 'important');
                    label.style.setProperty('color', 'white', 'important');
                    label.style.setProperty('width', '230px', 'important');
                    label.classList.add("hover-pointer");
                    let newWindow = 0;
                    // Add mouseover event listener to label
                    label.addEventListener('mouseenter', function(e) {
                        
                        chrome.runtime.sendMessage({ message: 'screenshotTab', windowId:tab.url }, function(response) {
                        newWindow = response.window;
                            // const preview = document.createElement('div');
                        // preview.className = 'preview';
                        // preview.innerHTML = `<img src="${response.screenshotUrl}" width="300" height="300"></img>`;
                        // popup.appendChild(preview);
                      })
                    });

                      // Add mouseout event listener to label
                      label.addEventListener('mouseout', function(e) {
                        if(newWindow != 0 )
                            chrome.runtime.sendMessage({ message: 'close_window', windowId: newWindow});
                    });
                    
                    const icon = document.createElement("img");
                    icon.src = tab.favIconUrl;
                    icon.style.setProperty('width', '20px', 'important');
                    icon.style.setProperty('height', '20px', 'important');
                    icon.style.setProperty("margin-right","5px",'important');
                    
                    wrapperLbl.append(icon);
                    wrapperLbl.append(label);


                    const btn = document.createElement("img");
                    btn.style.setProperty('height', '20px', 'important');
                    btn.style.setProperty('width', '20px', 'important');
                    btn.classList.add("hover-pointer");
                    btn.src = `https://img.icons8.com/external-inkubators-basic-outline-inkubators/32/FFFFFF/external-close-button-it-and-computer-inkubators-basic-outline-inkubators.png`;
                    btn.addEventListener('click', function() {
                        popup.removeChild(document.getElementById(tab.id));
                        closeTabFunc(tab.id); // Pass your arguments here
                    });

                    const closeTabFunc = (tabId)=>{
                        event.stopPropagation(); // Prevent the wrapper click event from firing
                        console.log(tabId);
                        chrome.runtime.sendMessage({ message: 'close_new_tab', tabId: tabId});
                    }
                    wrapper.append(wrapperLbl);
                    wrapper.append(btn);
                    popup.appendChild(wrapper);
                });

                document.body.appendChild(popup);
            });
        }
    }
});
