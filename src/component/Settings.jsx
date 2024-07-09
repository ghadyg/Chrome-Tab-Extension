import React, { useEffect, useRef, useState } from 'react'
import './Settings.css'
import Header from './Header'
import {
  FormControl,
  FormLabel,
  Input
} from '@chakra-ui/react'
import ColorPicker from './ColorPicker'

export default function Settings() {

  const [keysPressed, setKeysPressed] = useState({});
  const [settings, setSettings] = useState({
    bgColor: '#1C232C',
    color: '#FFFFFF',
    fontSize: 12,
    shortcut: 'Alt+v'
  });
  const inputRef = useRef(null);
  

  useEffect(() => {
    try {
      chrome.storage.local.get(['color', 'bgColor', 'fontSize'], (result) => {
        setSettings({
          bgColor: result.bgColor || '#1C232C',
          color: result.color || '#FFFFFF',
          fontSize: result.fontSize || 12
        });
      });
    } catch (error) {
      
    }
  }, []);

  const handleBgColor = (color) => {
    setSettings((prevSettings) => ({ ...prevSettings, bgColor: color }));
  };

  const handleColor = (color) => {
    setSettings((prevSettings) => ({ ...prevSettings, color: color }));
  };

  const handleFontSizeChange = (e) => {
    
    if (e.target.value <= 50) {
      setSettings((prevSettings) => ({ ...prevSettings, fontSize: e.target.value }));
    }
  };

  const saveSettings = () => {
    chrome.storage.local.set(settings, () => {
      console.log('Settings saved');
    });
  };

  const resetToDefault = () => {
    const defaultSettings = {
      bgColor: '#1C232C',
      color: '#ffffff',
      fontSize: 12,
      shortcut: 'Alt+v'
    };
    setSettings(defaultSettings);
  };


  const handleKeyDown = (event) => {
    event.preventDefault();
    setKeysPressed((prevKeys) => {
      const newKeys = { ...prevKeys, [event.key]: true };
      console.log(newKeys);
      return newKeys;
    });
    
  };

  const handleKeyUp = (event) => {
    
    event.preventDefault();
    updateShortcutDisplay(keysPressed);
    if (inputRef.current) {
      inputRef.current.blur(); // Remove focus from the input element
    }
    console.log(keysPressed);
  };

  const updateShortcutDisplay = (keys) => {
    const keysArray = Object.keys(keys).filter((key) => keys[key]);
    setSettings((prevSettings) => ({ ...prevSettings, shortcut: keysArray.join(' + ') }));
  };

  return (
    <>
    <section className="settings">
      <Header />
      <h2>Customize your TabWizard:</h2>
      <div className='settings-properties'>
        <FormControl w={'20vw'} display={'flex'} flexDirection={'column'}>
          <div className='formDiv'>
            <FormLabel>Background Color Picker:</FormLabel>
            <ColorPicker onColorChange={handleBgColor} colorPicker={settings.bgColor} />
          </div>
          <div className='formDiv'>
            <FormLabel>Text Color Picker:</FormLabel>
            <ColorPicker onColorChange={handleColor} colorPicker={settings.color} />
          </div>
          <div className='formDiv'>
            <FormLabel>URL Text Size:</FormLabel>
            <Input
              w={'60px'}
              h={'40px'}
              value={settings.fontSize}
              onChange={handleFontSizeChange}
            />
          </div>
          <div className='formDiv'>
            <FormLabel className='frmLabel'>Overlay Popup keys:</FormLabel>
            <Input
                ref={inputRef}
                w={'130px'}
                h={'40px'}
                textAlign={'center'}
                fontSize={12}
                value={settings.shortcut}
                onKeyDown={handleKeyDown}
                onKeyUp={handleKeyUp}
                onFocus={()=>setKeysPressed({})}
                readOnly
              />
          </div>
          
          <button className="settings-cta-button" onClick={saveSettings}>Save Settings</button>
          <button className="settings-cta-button" onClick={resetToDefault}>Reset to default</button>
        </FormControl>
        </div>

        <div id="site-change-popup" className="site-change-popup1" style={{backgroundColor:settings.bgColor, color:settings.color, fontSize:settings.fontSize+"px"}}>
        <div className="header-hover">
            <h1>Tabs</h1>
            <img className="new-tab-btn hover-pointer" src={`https://img.icons8.com/?size=100&id=37784&format=png&color=${settings.color.replace('#','')}`} alt="New Tab"/>
        </div>
        <div className="wrapper">
            <div className="wrapper-label hover-pointer">
                <img className="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACUCAMAAAD4QXiGAAAAYFBMVEX///8AAAD09PT8/PxUVFRtbW2Xl5fPz88QEBBHR0fY2NgZGRlNTU2Li4vFxcX5+fnm5ube3t4kJCSurq53d3e4uLheXl4vLy8eHh7s7OxoaGg4ODgqKiqCgoKlpaVBQUHAtH9pAAADX0lEQVR4nO2d266qMBBAoaAoKhe5aPH2/395PFpoabFgdvZ0ujPrCSdElk1TpmMYgmAWVjZ1F+OgvTVFPq/8JulCXNTJIu/osHNtanC8LxDPW9eak9zmxW+uHT8wO+qNa8NPnGfmOju6NvzIivk55E9Kq/netZ4F60zP8U6WMGxt5sXZtZ6Fq808xXcTUnBpfooveui6f+ihc2yEXrgzPzYlL5PVKFSVRTEOhVXKy3Qccmze8fdFKhmKxRqtLMYPkRg2GzTmV95f5dCHzkNoyDlOw6q9RmO+llc5GaHiKkIHKYPGnMvL9OmoTEXy+h3ZZPIsY5fgylxJO4TTUUmixNzYpTJ00L8BwZj3oynNIzHR1TGvsZjLtKN4GCHer/MY5/llmC73PnTKjdCj6EOV8Q2uzMOb8MzkSt2J6ybyrDYSITP5c2Ye7hPOeDlapx8ZZywdhS5ZwVhpruYjc64XMn47b4m7Vs9G467TR3fbdadwAiGZZ+3lnAGb/4y3d/P67fquFL85E2uld+ZRv6D6Zp4Pya9v5jIbTv0y59vh2DPzTB57Zq5kj3rZCLm5srH2zFw5Lj6bx2sc1F+bHwIcZNPmXDtNNY+ciBr8OXO9mO6PuSU/J/OfQubwkDk8ZA4PmcND5vD8NfONt+ZHb81Pup035hdvzR/emu/J/Bchc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3i+N78hMW++Nt/pT2C6ge2/Ng/3CXNPqrbBs5mPulqdt+5ROxbsbObBNcRLZzWP3YnNcreaY+6Yl1rNc6PTFxrq3Go+0e8FCbsksJub3YGQ8L8zkPw0ZR5M9U1zz+uxbPlx0pwZ3aQQUEULzIOg3OJqEHntxFPPMvTB/JkFrG/1Cgf1oRqe7V9gHgRR7jplEaiKi8xRQubwkDk8ZA4PmcODz5wnA9Ym59J8A6U2g7KHtFZ5lCysgnKzwmR/WXt9SjEP1wkClIKD3XxcU9k4R7U56p2TRuDcrr2xdmdHXVOprealaz0L9gJyhHGL/KadeStOibXuOfeekNE/GKhY8EaciVb0CFjyKp8gwVdu3jZLxJ933ApX1fZSWe9BL/4B+YFqDGH/OpIAAAAASUVORK5CYII=" alt="Icon"/>
                <label className="label hover-pointer">Tab Title</label>
            </div>
              <img className="btn hover-pointer" src={`https://img.icons8.com/external-inkubators-basic-outline-inkubators/32/${settings.color.replace('#','')}/external-close-button-it-and-computer-inkubators-basic-outline-inkubators.png`} alt="Close"/>
        </div>
        <div className="wrapper">
            <div className="wrapper-label hover-pointer">
                <img className="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACUCAMAAAD4QXiGAAAAYFBMVEX///8AAAD09PT8/PxUVFRtbW2Xl5fPz88QEBBHR0fY2NgZGRlNTU2Li4vFxcX5+fnm5ube3t4kJCSurq53d3e4uLheXl4vLy8eHh7s7OxoaGg4ODgqKiqCgoKlpaVBQUHAtH9pAAADX0lEQVR4nO2d266qMBBAoaAoKhe5aPH2/395PFpoabFgdvZ0ujPrCSdElk1TpmMYgmAWVjZ1F+OgvTVFPq/8JulCXNTJIu/osHNtanC8LxDPW9eak9zmxW+uHT8wO+qNa8NPnGfmOju6NvzIivk55E9Kq/netZ4F60zP8U6WMGxt5sXZtZ6Fq808xXcTUnBpfooveui6f+ihc2yEXrgzPzYlL5PVKFSVRTEOhVXKy3Qccmze8fdFKhmKxRqtLMYPkRg2GzTmV95f5dCHzkNoyDlOw6q9RmO+llc5GaHiKkIHKYPGnMvL9OmoTEXy+h3ZZPIsY5fgylxJO4TTUUmixNzYpTJ00L8BwZj3oynNIzHR1TGvsZjLtKN4GCHer/MY5/llmC73PnTKjdCj6EOV8Q2uzMOb8MzkSt2J6ybyrDYSITP5c2Ye7hPOeDlapx8ZZywdhS5ZwVhpruYjc64XMn47b4m7Vs9G467TR3fbdadwAiGZZ+3lnAGb/4y3d/P67fquFL85E2uld+ZRv6D6Zp4Pya9v5jIbTv0y59vh2DPzTB57Zq5kj3rZCLm5srH2zFw5Lj6bx2sc1F+bHwIcZNPmXDtNNY+ciBr8OXO9mO6PuSU/J/OfQubwkDk8ZA4PmcND5vD8NfONt+ZHb81Pup035hdvzR/emu/J/Bchc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3i+N78hMW++Nt/pT2C6ge2/Ng/3CXNPqrbBs5mPulqdt+5ROxbsbObBNcRLZzWP3YnNcreaY+6Yl1rNc6PTFxrq3Go+0e8FCbsksJub3YGQ8L8zkPw0ZR5M9U1zz+uxbPlx0pwZ3aQQUEULzIOg3OJqEHntxFPPMvTB/JkFrG/1Cgf1oRqe7V9gHgRR7jplEaiKi8xRQubwkDk8ZA4PmcODz5wnA9Ym59J8A6U2g7KHtFZ5lCysgnKzwmR/WXt9SjEP1wkClIKD3XxcU9k4R7U56p2TRuDcrr2xdmdHXVOprealaz0L9gJyhHGL/KadeStOibXuOfeekNE/GKhY8EaciVb0CFjyKp8gwVdu3jZLxJ933ApX1fZSWe9BL/4B+YFqDGH/OpIAAAAASUVORK5CYII=" alt="Icon"/>
                <label className="label hover-pointer">Tab Title</label>
            </div>
            <img className="btn hover-pointer" src={`https://img.icons8.com/external-inkubators-basic-outline-inkubators/32/${settings.color.replace('#','')}/external-close-button-it-and-computer-inkubators-basic-outline-inkubators.png`} alt="Close"/>
        </div>
        <div className="wrapper">
            <div className="wrapper-label hover-pointer">
                <img className="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACUCAMAAAD4QXiGAAAAYFBMVEX///8AAAD09PT8/PxUVFRtbW2Xl5fPz88QEBBHR0fY2NgZGRlNTU2Li4vFxcX5+fnm5ube3t4kJCSurq53d3e4uLheXl4vLy8eHh7s7OxoaGg4ODgqKiqCgoKlpaVBQUHAtH9pAAADX0lEQVR4nO2d266qMBBAoaAoKhe5aPH2/395PFpoabFgdvZ0ujPrCSdElk1TpmMYgmAWVjZ1F+OgvTVFPq/8JulCXNTJIu/osHNtanC8LxDPW9eak9zmxW+uHT8wO+qNa8NPnGfmOju6NvzIivk55E9Kq/netZ4F60zP8U6WMGxt5sXZtZ6Fq808xXcTUnBpfooveui6f+ihc2yEXrgzPzYlL5PVKFSVRTEOhVXKy3Qccmze8fdFKhmKxRqtLMYPkRg2GzTmV95f5dCHzkNoyDlOw6q9RmO+llc5GaHiKkIHKYPGnMvL9OmoTEXy+h3ZZPIsY5fgylxJO4TTUUmixNzYpTJ00L8BwZj3oynNIzHR1TGvsZjLtKN4GCHer/MY5/llmC73PnTKjdCj6EOV8Q2uzMOb8MzkSt2J6ybyrDYSITP5c2Ye7hPOeDlapx8ZZywdhS5ZwVhpruYjc64XMn47b4m7Vs9G467TR3fbdadwAiGZZ+3lnAGb/4y3d/P67fquFL85E2uld+ZRv6D6Zp4Pya9v5jIbTv0y59vh2DPzTB57Zq5kj3rZCLm5srH2zFw5Lj6bx2sc1F+bHwIcZNPmXDtNNY+ciBr8OXO9mO6PuSU/J/OfQubwkDk8ZA4PmcND5vD8NfONt+ZHb81Pup035hdvzR/emu/J/Bchc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3i+N78hMW++Nt/pT2C6ge2/Ng/3CXNPqrbBs5mPulqdt+5ROxbsbObBNcRLZzWP3YnNcreaY+6Yl1rNc6PTFxrq3Go+0e8FCbsksJub3YGQ8L8zkPw0ZR5M9U1zz+uxbPlx0pwZ3aQQUEULzIOg3OJqEHntxFPPMvTB/JkFrG/1Cgf1oRqe7V9gHgRR7jplEaiKi8xRQubwkDk8ZA4PmcODz5wnA9Ym59J8A6U2g7KHtFZ5lCysgnKzwmR/WXt9SjEP1wkClIKD3XxcU9k4R7U56p2TRuDcrr2xdmdHXVOprealaz0L9gJyhHGL/KadeStOibXuOfeekNE/GKhY8EaciVb0CFjyKp8gwVdu3jZLxJ933ApX1fZSWe9BL/4B+YFqDGH/OpIAAAAASUVORK5CYII=" alt="Icon"/>
                <label className="label hover-pointer">Tab Title</label>
            </div>
            <img className="btn hover-pointer" src={`https://img.icons8.com/external-inkubators-basic-outline-inkubators/32/${settings.color.replace('#','')}/external-close-button-it-and-computer-inkubators-basic-outline-inkubators.png`} alt="Close"/>
        
        </div>
        <div className="wrapper">
            <div className="wrapper-label hover-pointer">
                <img className="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACUCAMAAAD4QXiGAAAAYFBMVEX///8AAAD09PT8/PxUVFRtbW2Xl5fPz88QEBBHR0fY2NgZGRlNTU2Li4vFxcX5+fnm5ube3t4kJCSurq53d3e4uLheXl4vLy8eHh7s7OxoaGg4ODgqKiqCgoKlpaVBQUHAtH9pAAADX0lEQVR4nO2d266qMBBAoaAoKhe5aPH2/395PFpoabFgdvZ0ujPrCSdElk1TpmMYgmAWVjZ1F+OgvTVFPq/8JulCXNTJIu/osHNtanC8LxDPW9eak9zmxW+uHT8wO+qNa8NPnGfmOju6NvzIivk55E9Kq/netZ4F60zP8U6WMGxt5sXZtZ6Fq808xXcTUnBpfooveui6f+ihc2yEXrgzPzYlL5PVKFSVRTEOhVXKy3Qccmze8fdFKhmKxRqtLMYPkRg2GzTmV95f5dCHzkNoyDlOw6q9RmO+llc5GaHiKkIHKYPGnMvL9OmoTEXy+h3ZZPIsY5fgylxJO4TTUUmixNzYpTJ00L8BwZj3oynNIzHR1TGvsZjLtKN4GCHer/MY5/llmC73PnTKjdCj6EOV8Q2uzMOb8MzkSt2J6ybyrDYSITP5c2Ye7hPOeDlapx8ZZywdhS5ZwVhpruYjc64XMn47b4m7Vs9G467TR3fbdadwAiGZZ+3lnAGb/4y3d/P67fquFL85E2uld+ZRv6D6Zp4Pya9v5jIbTv0y59vh2DPzTB57Zq5kj3rZCLm5srH2zFw5Lj6bx2sc1F+bHwIcZNPmXDtNNY+ciBr8OXO9mO6PuSU/J/OfQubwkDk8ZA4PmcND5vD8NfONt+ZHb81Pup035hdvzR/emu/J/Bchc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3i+N78hMW++Nt/pT2C6ge2/Ng/3CXNPqrbBs5mPulqdt+5ROxbsbObBNcRLZzWP3YnNcreaY+6Yl1rNc6PTFxrq3Go+0e8FCbsksJub3YGQ8L8zkPw0ZR5M9U1zz+uxbPlx0pwZ3aQQUEULzIOg3OJqEHntxFPPMvTB/JkFrG/1Cgf1oRqe7V9gHgRR7jplEaiKi8xRQubwkDk8ZA4PmcODz5wnA9Ym59J8A6U2g7KHtFZ5lCysgnKzwmR/WXt9SjEP1wkClIKD3XxcU9k4R7U56p2TRuDcrr2xdmdHXVOprealaz0L9gJyhHGL/KadeStOibXuOfeekNE/GKhY8EaciVb0CFjyKp8gwVdu3jZLxJ933ApX1fZSWe9BL/4B+YFqDGH/OpIAAAAASUVORK5CYII=" alt="Icon"/>
                <label className="label hover-pointer">Tab Title</label>
            </div>
            <img className="btn hover-pointer" src={`https://img.icons8.com/external-inkubators-basic-outline-inkubators/32/${settings.color.replace('#','')}/external-close-button-it-and-computer-inkubators-basic-outline-inkubators.png`} alt="Close"/>
        </div>
        <div className="wrapper">
            <div className="wrapper-label hover-pointer">
                <img className="icon" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALkAAACUCAMAAAD4QXiGAAAAYFBMVEX///8AAAD09PT8/PxUVFRtbW2Xl5fPz88QEBBHR0fY2NgZGRlNTU2Li4vFxcX5+fnm5ube3t4kJCSurq53d3e4uLheXl4vLy8eHh7s7OxoaGg4ODgqKiqCgoKlpaVBQUHAtH9pAAADX0lEQVR4nO2d266qMBBAoaAoKhe5aPH2/395PFpoabFgdvZ0ujPrCSdElk1TpmMYgmAWVjZ1F+OgvTVFPq/8JulCXNTJIu/osHNtanC8LxDPW9eak9zmxW+uHT8wO+qNa8NPnGfmOju6NvzIivk55E9Kq/netZ4F60zP8U6WMGxt5sXZtZ6Fq808xXcTUnBpfooveui6f+ihc2yEXrgzPzYlL5PVKFSVRTEOhVXKy3Qccmze8fdFKhmKxRqtLMYPkRg2GzTmV95f5dCHzkNoyDlOw6q9RmO+llc5GaHiKkIHKYPGnMvL9OmoTEXy+h3ZZPIsY5fgylxJO4TTUUmixNzYpTJ00L8BwZj3oynNIzHR1TGvsZjLtKN4GCHer/MY5/llmC73PnTKjdCj6EOV8Q2uzMOb8MzkSt2J6ybyrDYSITP5c2Ye7hPOeDlapx8ZZywdhS5ZwVhpruYjc64XMn47b4m7Vs9G467TR3fbdadwAiGZZ+3lnAGb/4y3d/P67fquFL85E2uld+ZRv6D6Zp4Pya9v5jIbTv0y59vh2DPzTB57Zq5kj3rZCLm5srH2zFw5Lj6bx2sc1F+bHwIcZNPmXDtNNY+ciBr8OXO9mO6PuSU/J/OfQubwkDk8ZA4PmcND5vD8NfONt+ZHb81Pup035hdvzR/emu/J/Bchc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3jIHB4yh4fM4SFzeMgcHjKHh8zhIXN4yBweMoeHzOEhc3i+N78hMW++Nt/pT2C6ge2/Ng/3CXNPqrbBs5mPulqdt+5ROxbsbObBNcRLZzWP3YnNcreaY+6Yl1rNc6PTFxrq3Go+0e8FCbsksJub3YGQ8L8zkPw0ZR5M9U1zz+uxbPlx0pwZ3aQQUEULzIOg3OJqEHntxFPPMvTB/JkFrG/1Cgf1oRqe7V9gHgRR7jplEaiKi8xRQubwkDk8ZA4PmcODz5wnA9Ym59J8A6U2g7KHtFZ5lCysgnKzwmR/WXt9SjEP1wkClIKD3XxcU9k4R7U56p2TRuDcrr2xdmdHXVOprealaz0L9gJyhHGL/KadeStOibXuOfeekNE/GKhY8EaciVb0CFjyKp8gwVdu3jZLxJ933ApX1fZSWe9BL/4B+YFqDGH/OpIAAAAASUVORK5CYII=" alt="Icon"/>
                <label className="label hover-pointer">Tab Title</label>
            </div>
            <img className="btn hover-pointer" src={`https://img.icons8.com/external-inkubators-basic-outline-inkubators/32/${settings.color.replace('#','')}/external-close-button-it-and-computer-inkubators-basic-outline-inkubators.png`} alt="Close"/>
        </div>
       <button className='historyBtn' style={{border: `1px solid ${settings.color}`}}>
          Load from history
       </button>
    </div>
      </section>
    </>
    
  )
}