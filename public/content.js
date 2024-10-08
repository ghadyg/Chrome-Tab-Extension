
const parseShortcut = (shortcut) => {
    const parts = shortcut.split('+').map(part => part.trim());
    const modifiers = parts.slice(0, -1);
    const key = parts[parts.length - 1];
    return { modifiers, key };
  };
const checkShortcut = (event, shortcut) => {
    const { modifiers, key } = parseShortcut(shortcut);

    const modifierCheck = modifiers.every(modifier => {
      if (modifier === 'Alt') return event.altKey;
      if (modifier === 'Control') return event.ctrlKey;
      if (modifier === 'Shift') return event.shiftKey;
      if (modifier === 'Meta') return event.metaKey;
      return false;
    });

    return modifierCheck && event.key.toLowerCase() === key.toLowerCase();
  };

document.addEventListener('keydown', async function(event) {
    let bgColor = '#1C232C';
    let color = '#FFFFFF';
    let fontSize = 12;
    let shortcut = 'Alt+v';
    const getStorageData = () => {
        return new Promise((resolve, reject) => {
            chrome.storage.local.get(['color', 'bgColor', 'fontSize','shortcut'], (result) => {
                if (chrome.runtime.lastError) {
                    reject(chrome.runtime.lastError);
                } else {
                    resolve(result);
                }
            });
        });
    };
    const result = await getStorageData();
    if (result.bgColor) bgColor = result.bgColor;
    if (result.color) color = result.color;
    if (result.fontSize) fontSize = result.fontSize;
    if (result.shortcut) shortcut = result.shortcut;
    
    if (checkShortcut(event,shortcut)) {
        const existingPopup = document.getElementById('site-change-popup');
        if (existingPopup) {
            document.body.removeChild(existingPopup);
        } else {
            try {
                chrome.runtime.sendMessage({ message: 'get_tabs' }, async function(response) {
                    let tabs = response.tabs;
                    const link = document.createElement('link');
                    link.rel = 'stylesheet';
                    link.href = 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap';
                    document.head.appendChild(link);
                    //adding the hover style for the wrapper
                    const style = document.createElement('style');
    
                    // Add CSS rules for hover
                    style.textContent = `
                    .header-hover:hover{
                         cursor: grab !important;
                    }
                    .hover-pointer:hover {
                        cursor: pointer !important;
                    }
                    .preview {
                      position: absolute;
                      left: -310px;
                      top: 0;
                      background-color: ${bgColor};
                      border: 1px solid black;
                      padding: 10px;
                      width: 300px;
                      height: 300px;
                    }
                `;

                    // Append the style element to the document head
                    document.head.appendChild(style);



                    const popup = document.createElement('div');
                    popup.id = 'site-change-popup';

                    // Reset common properties
                    popup.style.setProperty('all', 'unset', 'important');

                    // Apply the desired styles
                    popup.style.setProperty('position', 'fixed', 'important');
                    popup.style.setProperty('top', '0vh', 'important');
                    popup.style.setProperty('right', '1vw', 'important');
                    popup.style.setProperty('background-color', `${bgColor}`, 'important');
                    popup.style.setProperty('color', 'white', 'important');
                    popup.style.setProperty('border', '1px solid black', 'important');
                    popup.style.setProperty('padding', '1px', 'important');
                    popup.style.setProperty('z-index', '10000', 'important');
                    popup.style.setProperty('display', 'flex', 'important');
                    popup.style.setProperty('flex-direction', 'column', 'important');
                    popup.style.setProperty('gap', '10px', 'important');
                    popup.style.setProperty('width', '307px', 'important');
                    popup.style.setProperty('max-height', '99vh', 'important');
                    popup.style.setProperty('overflow-y', 'auto', 'important');
                    popup.style.setProperty('overflow-x', 'hidden', 'important'); 
                    popup.style.setProperty('margin', '0', 'important'); 
                    popup.style.setProperty('box-sizing', 'border-box', 'important'); // Ensure proper box sizing
                    popup.style.setProperty('font-family', "'Roboto', sans-serif", 'important');

                    // Function to adjust the width based on scrollbar presence
                    function adjustPopupWidth() {
                        if (popup.scrollHeight > popup.clientHeight) {
                            popup.style.setProperty('width', '287px', 'important');
                        } else {
                            popup.style.setProperty('width', '270px', 'important');
                        }
                    }

                    const headerDiv = document.createElement('div');
                    headerDiv.removeAttribute('style');
                    headerDiv.style.setProperty('position', 'sticky', 'important');
                    headerDiv.style.setProperty('top', '0', 'important');
                    headerDiv.style.setProperty('background-color', `${bgColor}`, 'important');
                    headerDiv.style.setProperty('padding', '10px', 'important');
                    headerDiv.style.setProperty('margin', '0', 'important'); 
                    headerDiv.style.setProperty('z-index', '10001', 'important');
                    headerDiv.style.setProperty('border-bottom', '1px solid black', 'important');
                    headerDiv.style.setProperty('border-radius', '0', 'important');
                    headerDiv.style.setProperty('width', '270px', 'important');
                    headerDiv.style.setProperty('display', 'flex', 'important');
                    headerDiv.style.setProperty('justify-content', 'space-between', 'important');
                    headerDiv.style.setProperty('box-sizing', 'border-box', 'important');
                    headerDiv.classList.add("header-hover");

                    // Variables to store the initial position and state
                    let isDragging = false;
                    let startX, startY, initialX, initialY;

                    headerDiv.addEventListener('mousedown', function (e) {
                        isDragging = true;
                        startX = e.clientX-popup.offsetLeft;
                        startY = e.clientY-popup.offsetTop;
                        document.addEventListener('mousemove', handleMouseMove);
                        document.addEventListener('mouseup', handleMouseUp);
                    });

                    function handleMouseMove(e) {
                        if (!isDragging) return;
                        
                        popup.style.setProperty('position', 'absolute', 'important');
                        const dx = e.clientX;
                        const dy = e.clientY;
                        popup.style.setProperty('left', `${dx-startX}px`, 'important');
                        popup.style.setProperty('top', `${dy-startY}px`, 'important');
                        
                    }

                    function handleMouseUp() {
                        isDragging = false;
                        popup.style.setProperty('position', 'fixed', 'important');
                        document.removeEventListener('mousemove', handleMouseMove);
                        document.removeEventListener('mouseup', handleMouseUp);
                    }





                    // Create the h1 element
                    const header = document.createElement('h1');
                    header.textContent = 'Tabs';
                    header.style.setProperty('margin', '0', 'important');
                    header.style.setProperty('font-size', '25px', 'important');
                    header.style.setProperty('color', `${color}`, 'important');
                    const newTabbtn = document.createElement("img");
                    newTabbtn.style.setProperty('height', '20px', 'important');
                    newTabbtn.style.setProperty('width', '20px', 'important');
                    newTabbtn.style.setProperty('align-self', 'center', 'important');
                    newTabbtn.classList.add("hover-pointer");
                    newTabbtn.src = `https://img.icons8.com/?size=100&id=37784&format=png&color=${color.replace('#','')}`;
                    
                    headerDiv.appendChild(header);
                    headerDiv.appendChild(newTabbtn);
                    popup.appendChild(headerDiv);
                    
                    tabs.sort((a, b) => b.lastAccessed - a.lastAccessed);
                    let firstTime = true;
                    newTabbtn.addEventListener('click', function() {
                         chrome.runtime.sendMessage({ message: 'create-new-window'}); 
                     });
                    
                    
                    const addHistoryTabsbtn = document.createElement("button");
                    // addHistoryTabsbtn.style.setProperty('height', '20px', 'important');
                    // addHistoryTabsbtn.style.setProperty('width', '20px', 'important');
                    // addHistoryTabsbtn.style.setProperty('align-self', 'center', 'important');
                    // addHistoryTabsbtn.classList.add("hover-pointer");
                    // addHistoryTabsbtn.src = `https://img.icons8.com/?size=100&id=37784&format=png&color=${color.replace('#','')}`;
                    addHistoryTabsbtn.style.setProperty('position', 'relative', 'important');
                    addHistoryTabsbtn.style.setProperty('margin', 'auto', 'important');
                    addHistoryTabsbtn.style.setProperty('color', `${color}`, 'important');
                    addHistoryTabsbtn.style.setProperty('margin-bottom', '5px', 'important');
                    addHistoryTabsbtn.style.setProperty('background-color', 'transparent', 'important');
                    addHistoryTabsbtn.style.setProperty('padding', '5px 10px', 'important');
                    addHistoryTabsbtn.style.setProperty('border-radius', '20px', 'important');
                    addHistoryTabsbtn.style.setProperty('border',  `1px solid ${color}`, 'important');
                    addHistoryTabsbtn.textContent = 'Load from history';
                    addHistoryTabsbtn.classList.add("hover-pointer"); 

                    addHistoryTabsbtn.addEventListener('click', function() {
                        chrome.runtime.sendMessage({ message: 'laod-history',tabCount:tabs.length},function(responseTab){
                                   //console.log(responseTab.tabs);
                                   let filteredResponseTab = responseTab.tabs.filter(tab => !tabs.some(existingTab => existingTab.url === tab.url));
                                   addTabsToPopup(filteredResponseTab);
                                   adjustPopupWidth();
                                   tabs = [...tabs,...filteredResponseTab];
                                   //firstTime =false;
                                   tabs.sort((a, b) => b.lastAccessed - a.lastAccessed);
                                   
    
                               }); 
                           
                           // else{
                           //     console.log(tabs[tabs.length-1].lastAccessed);
                           //     const lastAccessed = tabs[tabs.length-1].lastAccessed;
                           //     chrome.runtime.sendMessage({ message: 'laod-history',lastAccessed:lastAccessed},function(responseTab){
                           //         addTabsToPopup(responseTab.tabs);
                           //         tabs = [...tabs,...responseTab.tabs];
                           //         tabs.sort((a, b) => b.lastAccessed - a.lastAccessed);
                           //     }); 
                           // }
                    });
                    
                    popup.appendChild(addHistoryTabsbtn);
                    addTabsToPopup(tabs);
                    
                    
    
                    document.body.appendChild(popup);
                    
                    adjustPopupWidth();
                    
                    function addTabsToPopup(tabs) {
                        tabs.forEach((tab, index) => {
                            const wrapper = document.createElement("div");
                            wrapper.id = tab.id;
                            wrapper.style.setProperty('display', 'flex', 'important');
                            wrapper.style.setProperty('gap', '20px', 'important');
                            wrapper.style.setProperty('justify-content', 'space-between', 'important');
                            wrapper.style.setProperty('background-color', `${bgColor}`, 'important');
                            wrapper.style.setProperty('padding', '10px', 'important');
                            wrapper.style.setProperty('margin', '0px', 'important');
                            wrapper.style.setProperty('width', '270px', 'important');
                            wrapper.style.setProperty('box-sizing', 'border-box', 'important');
    
                            // if(index !== tabs.length-1){
                            wrapper.style.setProperty('border-radius', '0', 'important');
                           // wrapper.style.setProperty('border-bottom', '2px solid black', 'important');
                            //}
                            
    
                            const wrapperLbl = document.createElement("div");
                            wrapperLbl.style.setProperty('box-sizing', 'border-box', 'important');
                            wrapperLbl.style.setProperty('display', 'flex', 'important');
                            wrapperLbl.style.setProperty('background-color', `${bgColor}`, 'important');
                            wrapperLbl.style.setProperty('padding', '0px', 'important');
                            wrapperLbl.style.setProperty('align-self', 'center', 'important');
                            wrapperLbl.style.setProperty('margin', '0px', 'important');
                            wrapperLbl.style.setProperty('width', '210px', 'important');
                            wrapperLbl.addEventListener('contextmenu', function (e) {
                                e.preventDefault();
                            }, false);
                            wrapperLbl.addEventListener('mousedown', function (e) {
                                console.log(e);
                                if(e.button ==0)
                                {
                                    e.preventDefault();
                                    const left = this.getBoundingClientRect(popup).left;
                                    const width =this.getBoundingClientRect(popup).width;
                                    wrapperClick(left,width); // Pass your arguments here
                                }
                                else if(e.button ==1)
                                {
                                    popup.removeChild(document.getElementById(tab.id));
                                    if(tab.windowId)
                                        closeTabFunc(tab.id); // Pass your arguments here
                                    }
                                else if(e.button ==2)
                                {
                                    e.preventDefault();
                                    chrome.runtime.sendMessage({ message: 'switchToTab', tabId:tab.id });
                                }
                                
                            });
                            const wrapperClick = (left,width) => {
                                
                                chrome.runtime.sendMessage({ message: 'open_new_tab', windowId: tab.url, left: left,width:width,top: window.innerHeight });
                            };
                            
                            wrapperLbl.classList.add("hover-pointer");
    
    
    
                            
                            const label = document.createElement("label");
                            label.textContent = tab.title ? tab.title : tab.url;
                            label.style.setProperty('background-color', `${bgColor}`, 'important');
                            label.style.setProperty('color', `${color}`, 'important');
                            label.style.setProperty('width', '180px', 'important');
                            label.style.setProperty('overflow', 'hidden', 'important');
                            label.style.setProperty('text-overflow', 'ellipsis', 'important');
                            label.style.setProperty('white-space', 'nowrap', 'important');
                            label.style.setProperty('font-size', `${fontSize}px`, 'important');
                            label.classList.add("hover-pointer");
                            
    
                            let newWindow = 0;
    
                            // Add mouseover event listener to label
                            label.addEventListener('mouseenter', function (e) {
                            
                                const left = this.getBoundingClientRect(popup).left;
                                const width =this.getBoundingClientRect(popup).width;
                                chrome.runtime.sendMessage({ message: 'screenshotTab', windowId: tab.url, left: left,width:width,top: window.innerHeight }, function (response) {
                                    newWindow = response.window;
                                    ;
                                });
                            });
    
                            // Add mouseout event listener to label
                            label.addEventListener('mouseout', function (e) {
                                setTimeout(function() {
                                    if (newWindow != 0)
                                        chrome.runtime.sendMessage({ message: 'close_window', windowId: newWindow });
                                }, 100);
                            });
    
                            const icon = document.createElement("img");
                            icon.src = tab.favIconUrl ? tab.favIconUrl : "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACUCAMAAAD4QXiGAAAAYFBMVEX///8AAAD09PT8/PxUVFRtbW2Xl5fPz88QEBBHR0fY2NgZGRlNTU2Li4vFxcX5+fnm5ube3t4kJCSurq53d3e4uLheXl4vLy8eHh7s7OxoaGg4ODgqKiqCgoKlpaVBQUHAtH9pAAADX0lEQVR4nO2d266qMBBAoaAoKhe5aPH2/395PFpoabFgdvZ0ujPrCSdElk1TpmMYgmAWVjZ1F+OgvTVFPq/8JulCXNTJIu/osHNtanC8LxDPW9eak9zmxW+uHT8wO+qNa8NPnGfmOju6NvzIivk55E9Kq/netZ4F60zP8U6WMGxt5sXZtZ6Fq808xXcTUnBpfooveui6f+ihc2yEXrgzPzYlL5PVKFSVRTEOhVXKy3Qccmze8fdFKhmKxRqtLMYPkRg2GzTmV95f5dCHzkNoyDlOw6q9RmO+llc5GaHiKkIHKYPGnMvL9OmoTEXy+h3ZZPIsY5fgylxJO4TTUUmixNzYpTJ00L8BwZj3oynNIzHR1TGvsZjLtKN4GCHer/MY5/llmC73PnTKjdCj6EOV8Q2uzMOb8MzkSt2J6ybyrDYSITP5c2Ye7hPOeDlapx8ZZywdhS5ZwVhpruYjc64XMn47b4m7Vs9G467TR3fbdadwAiGZZ+3lnAGb/4y3d/P67fquFL85E2uld+ZRv6D6Zp4Pya9v5jIbTv0y59vh2DPzTB57Zq5kj3rZCLm5srH2zFw5Lj6bx2sc1F+bHwIcZNPmXDtNNY+ciBr8OXO9mO6PuSU/J/OfQubwkDk8ZA4PmcND5vD8NfONt+ZHb81Pup035hdvzR/emu/J/Bchc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3i+N78hMW++Nt/pT2C6ge2/Ng/3CXNPqrbBs5mPulqdt+5ROxbsbObBNcRLZzWP3YnNcreaY+6Yl1rNc6PTFxrq3Go+0e8FCbsksJub3YGQ8L8zkPw0ZR5M9U1zz+uxbPlx0pwZ3aQQUEULzIOg3OJqEHntxFPPMvTB/JkFrG/1Cgf1oRqe7V9gHgRR7jplEaiKi8xRQubwkDk8ZA4PmcODz5wnA9Ym59J8A6U2g7KHtFZ5lCysgnKzwmR/WXt9SjEP1wkClIKD3XxcU9k4R7U56p2TRuDcrr2xdmdHXVOprealaz0L9gJyhHGL/KadeStOibXuOfeekNE/GKhY8EaciVb0CFjyKp8gwVdu3jZLxJ933ApX1fZSWe9BL/4B+YFqDGH/OpIAAAAASUVORK5CYII=";
                            icon.style.setProperty('width', '20px', 'important');
                            icon.style.setProperty('height', '20px', 'important');
                            icon.style.setProperty("margin-right", "5px", 'important');
    
                            wrapperLbl.append(icon);
                            wrapperLbl.append(label);
    
    
                            const btn = document.createElement("img");
                            btn.style.setProperty('height', '20px', 'important');
                            btn.style.setProperty('width', '20px', 'important');
                            btn.classList.add("hover-pointer");
                            btn.src = `https://img.icons8.com/external-inkubators-basic-outline-inkubators/32/${color.replace('#','')}/external-close-button-it-and-computer-inkubators-basic-outline-inkubators.png`;
                            btn.addEventListener('click', function () {
                                popup.removeChild(document.getElementById(tab.id));
                                if(tab.windowId)
                                    closeTabFunc(tab.id); // Pass your arguments here
                            });
    
                            const closeTabFunc = (tabId) => {
                                event.stopPropagation(); // Prevent the wrapper click event from firing
                                console.log(tabId);
                                chrome.runtime.sendMessage({ message: 'close_new_tab', tabId: tabId });
                            };
                            wrapper.append(wrapperLbl);
                            wrapper.append(btn);
                            popup.insertBefore(wrapper, popup.lastChild);
                        });
                    }
                });
            } catch (error) {
                const popup = document.createElement('div');
                    popup.id = 'site-change-popup';
    
                    // Reset common properties
                    popup.style.setProperty('all', 'unset', 'important');
    
                    // Apply the desired styles
                    popup.style.setProperty('position', 'fixed', 'important');
                    popup.style.setProperty('top', '0vh', 'important');
                    popup.style.setProperty('right', '1vw', 'important');
                    popup.style.setProperty('background-color', `${bgColor}`, 'important');
                    popup.style.setProperty('color', `${color}`, 'important');
                    popup.style.setProperty('border', '1px solid black', 'important');
                    popup.style.setProperty('padding', '1px', 'important');
                    popup.style.setProperty('z-index', '10000', 'important');
                    popup.style.setProperty('display', 'flex', 'important');
                    popup.style.setProperty('flex-direction', 'column', 'important');
                    popup.style.setProperty('gap', '10px', 'important');
                    popup.style.setProperty('width', '307px', 'important');
                    popup.style.setProperty('max-height', '99vh', 'important');
                    popup.style.setProperty('overflow-y', 'auto', 'important');
                    popup.style.setProperty('overflow-x', 'hidden', 'important'); 
                    popup.style.setProperty('margin', '0', 'important'); 
                    popup.style.setProperty('box-sizing', 'border-box', 'important'); // Ensure proper box sizing
    
                    // Function to adjust the width based on scrollbar presence
                    function adjustPopupWidth() {
                        if (popup.scrollHeight > popup.clientHeight) {
                            popup.style.setProperty('width', '287px', 'important');
                           
                        } else {
                            popup.style.setProperty('width', '270px', 'important');
                            
                        }
                    }
    
    
                    const headerDiv = document.createElement('div');
                    headerDiv.removeAttribute('style');
                    headerDiv.style.setProperty('position', 'sticky', 'important');
                    headerDiv.style.setProperty('top', '0', 'important');
                    headerDiv.style.setProperty('background-color', `${bgColor}`, 'important');
                    headerDiv.style.setProperty('padding', '10px', 'important');
                    headerDiv.style.setProperty('margin', '0', 'important'); 
                    headerDiv.style.setProperty('z-index', '10001', 'important');
                    headerDiv.style.setProperty('border-bottom', '1px solid black', 'important');
                    headerDiv.style.setProperty('border-radius', '0', 'important');
                    headerDiv.style.setProperty('width', '270px', 'important');
                    headerDiv.style.setProperty('display', 'flex', 'important');
                    headerDiv.style.setProperty('justify-content', 'space-between', 'important');
                    headerDiv.style.setProperty('box-sizing', 'border-box', 'important');
                    // Create the h1 element
                    const header = document.createElement('h1');
                    header.textContent = 'Please refresh the page';
                    header.style.setProperty('margin', '0', 'important');
            }
            
        }
    }
});
