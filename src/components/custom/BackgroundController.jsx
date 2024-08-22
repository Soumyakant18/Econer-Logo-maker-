import React, { useEffect, useState, useContext } from 'react';
import { Slider } from '@/components/ui/slider';
import ColorPickerController from './ColorPickerController';
import { UpdateStorageContext } from '@/context/UpdateStorageContext';

function BackgroundController() {
  let storageValue;

  try {
    storageValue = JSON.parse(localStorage.getItem('value')) || {};
  } catch (error) {
    storageValue = {}; 
  }

  const [rounded, setRounded] = useState(storageValue.bgRounded || 0);
  const [padding, setPadding] = useState(storageValue.bgPadding || 0);
  const [color, setColor] = useState(storageValue.bgColor || '#fff');
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  useEffect(() => {
    const updateValue = {
      ...storageValue,
      bgRounded: rounded,
      bgPadding: padding,
      bgColor: color,
    };

    localStorage.setItem('value', JSON.stringify(updateValue));
    setUpdateStorage(updateValue);  
  }, [rounded, padding, color, setUpdateStorage, storageValue]);

  return (
    <div>
      <div className='py-2'>
        <label className='p-2 flex justify-between items-center'>
          Rounded<span>{rounded} px</span>
        </label>
        <Slider
          defaultValue={[rounded]}
          max={512}
          step={1}
          onValueChange={(event) => setRounded(event[0])}
        />
      </div>
      <div className='py-2'>
        <label className='p-2 flex justify-between items-center'>
          Padding<span>{padding} px</span>
        </label>
        <Slider
          defaultValue={[padding]}
          max={100}
          step={1}
          onValueChange={(event) => setPadding(event[0])}
        />
      </div>
      <div className='py-2'>
        <label className='p-2 flex justify-between items-center'>
          Background Color
        </label>
        <ColorPickerController selectedColor={(color) => setColor(color)} />
      </div>
    </div>
  );
}

export default BackgroundController;
