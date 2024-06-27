document.addEventListener('keydown', function(event) {
    if (event.altKey && event.key === 'v') {

        const existingPopup = document.getElementById('site-change-popup');
        console.log(existingPopup);
        if (existingPopup) {
            document.body.removeChild(existingPopup);
        } else {
            chrome.runtime.sendMessage({ message: 'get_tabs' }, function(response) {
                const tabs = response.tabs;
                const popup = document.createElement('div');
                popup.id = 'site-change-popup';
                popup.style.setProperty('position', 'fixed', 'important');
                popup.style.setProperty('top', '0vh', 'important');
                popup.style.setProperty('right', '1vw', 'important');
                popup.style.setProperty('background-color', 'rgb(28, 35, 44,0.9)', 'important');
                popup.style.setProperty('color', 'white', 'important');
                popup.style.setProperty('border', '1px solid black', 'important');
                popup.style.setProperty('padding', '1px', 'important');
                popup.style.setProperty('z-index', '10000', 'important');
                popup.style.setProperty('display', 'flex', 'important');
                popup.style.setProperty('flex-direction', 'column', 'important');
                popup.style.setProperty('gap', '10px', 'important');
                popup.style.setProperty('width', '307px', 'important');
                popup.style.setProperty('max-height', '100vh', 'important');
                popup.style.setProperty('overflow-y', 'auto', 'important');
                popup.style.setProperty('overflow-x', 'none', 'important'); 
                popup.style.setProperty('margin', '0', 'important'); 
                // Function to adjust the width based on scrollbar presence
                function adjustPopupWidth() {
                    if (popup.scrollHeight > popup.clientHeight) {
                        popup.style.setProperty('width', '307px', 'important');
                    } else {
                        popup.style.setProperty('width', '290px', 'important');
                    }
                }
                

                tabs.forEach((tab,index) => {
                    const wrapper = document.createElement("div");
                    wrapper.id = tab.id;
                    wrapper.style.setProperty('display', 'flex', 'important');
                    wrapper.style.setProperty('gap', '20px', 'important');
                    wrapper.style.setProperty('justify-content', 'space-between', 'important');
                    wrapper.style.setProperty('background-color', 'rgb(28, 35, 44)', 'important');
                    wrapper.style.setProperty('padding', '10px', 'important');
                    wrapper.style.setProperty('margin', '0px', 'important');
                    wrapper.style.setProperty('width', '270px', 'important');
                    
                   
                    if(index !== tabs.length-1)
                        {
                            wrapper.style.setProperty('border-radius', '0', 'important');
                            wrapper.style.setProperty('border-bottom', '2px solid black', 'important');
                        }

                    const wrapperClick = (tabUrl,tabId)=>{
                        chrome.runtime.sendMessage({ message: 'open_new_tab',  windowId:tab.url,top:window.innerHeight,left:window.innerWidth });   
                    }
                   
                    const wrapperLbl = document.createElement("div");
                    
                    wrapperLbl.style.setProperty('display', 'flex', 'important');
                    wrapperLbl.style.setProperty('background-color', 'rgb(28, 35, 44)', 'important');
                    wrapperLbl.style.setProperty('padding', '0px', 'important');
                    wrapperLbl.style.setProperty('margin', '0px', 'important');
                    wrapperLbl.style.setProperty('width', '210px', 'important');
                    
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
                          background-color: rgb(28, 35, 44);
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
                    label.style.setProperty('background-color', 'rgb(28, 35, 44)', 'important');
                    label.style.setProperty('color', 'white', 'important');
                    label.style.setProperty('width', '180px', 'important');
                    label.classList.add("hover-pointer");
                    let newWindow = 0;
                    
                    // Add mouseover event listener to label
                    label.addEventListener('mouseenter', function(e) {
                        chrome.runtime.sendMessage({ message: 'screenshotTab', windowId:tab.url,top:window.innerHeight,left:window.innerWidth }, function(response) {
                        newWindow = response.window;
                        ;
                      })
                    });

                      // Add mouseout event listener to label
                      label.addEventListener('mouseout', function(e) {
                        if(newWindow != 0 )
                            chrome.runtime.sendMessage({ message: 'close_window', windowId: newWindow});
                    });
                    
                    const icon = document.createElement("img");
                    icon.src = tab.favIconUrl? tab.favIconUrl: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACUCAMAAAD4QXiGAAAAYFBMVEX///8AAAD09PT8/PxUVFRtbW2Xl5fPz88QEBBHR0fY2NgZGRlNTU2Li4vFxcX5+fnm5ube3t4kJCSurq53d3e4uLheXl4vLy8eHh7s7OxoaGg4ODgqKiqCgoKlpaVBQUHAtH9pAAADX0lEQVR4nO2d266qMBBAoaAoKhe5aPH2/395PFpoabFgdvZ0ujPrCSdElk1TpmMYgmAWVjZ1F+OgvTVFPq/8JulCXNTJIu/osHNtanC8LxDPW9eak9zmxW+uHT8wO+qNa8NPnGfmOju6NvzIivk55E9Kq/netZ4F60zP8U6WMGxt5sXZtZ6Fq808xXcTUnBpfooveui6f+ihc2yEXrgzPzYlL5PVKFSVRTEOhVXKy3Qccmze8fdFKhmKxRqtLMYPkRg2GzTmV95f5dCHzkNoyDlOw6q9RmO+llc5GaHiKkIHKYPGnMvL9OmoTEXy+h3ZZPIsY5fgylxJO4TTUUmixNzYpTJ00L8BwZj3oynNIzHR1TGvsZjLtKN4GCHer/MY5/llmC73PnTKjdCj6EOV8Q2uzMOb8MzkSt2J6ybyrDYSITP5c2Ye7hPOeDlapx8ZZywdhS5ZwVhpruYjc64XMn47b4m7Vs9G467TR3fbdadwAiGZZ+3lnAGb/4y3d/P67fquFL85E2uld+ZRv6D6Zp4Pya9v5jIbTv0y59vh2DPzTB57Zq5kj3rZCLm5srH2zFw5Lj6bx2sc1F+bHwIcZNPmXDtNNY+ciBr8OXO9mO6PuSU/J/OfQubwkDk8ZA4PmcND5vD8NfONt+ZHb81Pup035hdvzR/emu/J/Bchc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3i+N78hMW++Nt/pT2C6ge2/Ng/3CXNPqrbBs5mPulqdt+5ROxbsbObBNcRLZzWP3YnNcreaY+6Yl1rNc6PTFxrq3Go+0e8FCbsksJub3YGQ8L8zkPw0ZR5M9U1zz+uxbPlx0pwZ3aQQUEULzIOg3OJqEHntxFPPMvTB/JkFrG/1Cgf1oRqe7V9gHgRR7jplEaiKi8xRQubwkDk8ZA4PmcODz5wnA9Ym59J8A6U2g7KHtFZ5lCysgnKzwmR/WXt9SjEP1wkClIKD3XxcU9k4R7U56p2TRuDcrr2xdmdHXVOprealaz0L9gJyhHGL/KadeStOibXuOfeekNE/GKhY8EaciVb0CFjyKp8gwVdu3jZLxJ933ApX1fZSWe9BL/4B+YFqDGH/OpIAAAAASUVORK5CYII=";
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
                adjustPopupWidth();
            });
        }
    }
});

