import { Smile } from 'lucide-react';
import React, { useContext, useEffect, useState } from 'react';
import { Slider } from "@/components/ui/slider";
import ColorPickerController from './ColorPickerController';
import { UpdateStorageContext } from '@/context/UpdateStorageContext';
import IconList from './IconList';

function IconController() {
  const { updateStorage, setUpdateStorage } = useContext(UpdateStorageContext);

  const storageValue = JSON.parse(localStorage.getItem('value')) || {};

  const [size, setSize] = useState(storageValue.iconSize || 280);
  const [rotate, setRotate] = useState(storageValue.iconRotate || 0);
  const [color, setColor] = useState(storageValue.iconColor || '#fff');
  const [icon,setIcon]=useState(storageValue.icon || 'Smile');

  useEffect(() => {
    const updatedValue = {
      ...storageValue,
      iconSize: size,
      iconRotate: rotate,
      iconColor: color,
      icon: icon,
    };
    
  
    localStorage.setItem('value', JSON.stringify(updatedValue));

   
    setUpdateStorage(prev => ({ ...prev, ...updatedValue }));
  }, [size, rotate, color, setUpdateStorage,icon]);

  return (
    <div>
      <div>
       <IconList selectedIcon={(icon)=>setIcon(icon)}/>
        <div className='py-2'>
          <label className='p-2 flex justify-between items-center'>Size<span>{size}px</span></label>
          <Slider defaultValue={[size]} max={512} step={1} onValueChange={(event) => setSize(event[0])} />
        </div>
        <div className='py-2'>
          <label className='p-2 flex justify-between items-center'>Rotate<span>{rotate} °</span></label>
          <Slider defaultValue={[rotate]} max={360} step={1} onValueChange={(event) => setRotate(event[0])} />
        </div>
        <div className='py-2'>
          <label className='p-2 flex justify-between items-center'>Icon Color</label>
          <ColorPickerController selectedColor={(color) => setColor(color)} />
        </div>
      </div>
    </div>
  );
}

export default IconController;
