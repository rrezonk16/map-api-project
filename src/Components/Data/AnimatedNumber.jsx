import React, { useState, useEffect } from 'react';

const AnimatedNumber = ({ startValue }) => {
  const [value, setValue] = useState(startValue);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (startValue > 1000000) {
        setValue(prevValue => prevValue + 1);
      }
      
    }, 1000);

    return () => clearInterval(intervalId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <span className="text-3xl mt-2">
      {value.toLocaleString().split('').map((digit, index, array) => (
        <span key={index} className={index === array.length - 1 ? 'spin' : ''}>
          {digit}
        </span>
      ))}
    </span>
  );
};

export default AnimatedNumber;
