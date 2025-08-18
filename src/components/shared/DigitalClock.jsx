import React, { useState, useEffect } from 'react';
import { useTheme } from '../../context/ThemeContext';

const DigitalClock = () => {
  const [time, setTime] = useState(new Date());
  const {theme} = useTheme();

  useEffect(() => {
    
    const timerId = setInterval(() => {
      setTime(new Date());
    }, 1000); 

    
    return () => {
      clearInterval(timerId);
    };
  }, []); 

  
  const formattedTime = time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true, //  12-hour format with AM/PM
  });

  return (
    <div className={`text-lg font-bold tracking-wide  px-3 py-1 rounded-md ${theme==="dark" ? "text-white" : "text-blue-600"}`}>
      {formattedTime}
    </div>
  );
};

export default DigitalClock;
