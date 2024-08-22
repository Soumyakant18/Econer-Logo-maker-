import React, { useState } from 'react';
import ColorPicker from 'react-best-gradient-color-picker';

function ColorPickerController({ selectedColor }) {  // Destructure selectedColor from props
    const [color, setColor] = useState('rgba(255,255,255,1)');

    const handleChange = (newColor) => {
        setColor(newColor);
        if (selectedColor) {  // Ensure selectedColor is a function before calling it
            selectedColor(newColor);
        }
    };

    return (
        <div>
            <ColorPicker value={color} onChange={handleChange} />
        </div>
    );
}

export default ColorPickerController;
