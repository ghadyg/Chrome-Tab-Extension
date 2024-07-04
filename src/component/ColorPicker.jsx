// ColorPicker.js
import React, { useEffect, useState } from 'react';
import { ChromePicker } from 'react-color';
import './ColorPicker.css';

const ColorPicker = ({ onColorChange,colorPicker }) => {
  const [color, setColor] = useState(colorPicker);
  const [displayColorPicker, setDisplayColorPicker] = useState(false);

  const handleClick = () => {
    setDisplayColorPicker(!displayColorPicker);
  };

  const handleClose = () => {
    setDisplayColorPicker(false);
  };

  const handleChange = (color) => {
    setColor(color.hex);
    onColorChange(color.hex); // Pass the color to the parent component
  };
  useEffect(() => {
    setColor(colorPicker);
  }, [colorPicker]);

  return (
    <div className="color-picker">
      <div className="swatch" onClick={handleClick} style={{ backgroundColor: color }} />
      {displayColorPicker ? (
        <div className="popover">
          <div className="cover" onClick={handleClose} />
          <ChromePicker color={color} onChange={handleChange} />
        </div>
      ) : null}
    </div>
  );
};

export default ColorPicker;
