import { useEffect, useState } from 'react';
import Signal from './Signal';

export default function Traffic({ lights = ['green', 'yellow', 'red'] }) {
  const [activeIndex, setActive] = useState(0);

  useEffect(() => {
    let intervalDuration;

    if (lights[activeIndex] === 'green') {
      intervalDuration = 4000;
    } else if (lights[activeIndex] === 'yellow') {
      intervalDuration = 2000;
    } else if (lights[activeIndex] === 'red') {
      intervalDuration = 4000;
    }

    const intervalId = setTimeout(() => {
      setActive((prevActive) => (prevActive + 1) % lights.length);
    }, intervalDuration);

    return () => {
      clearTimeout(intervalId);
    };
  }, [activeIndex, lights.length]);

  return (
    <>
      {lights.map((color, index) => (
        <Signal key={index} isActive={activeIndex === index} color={color} />
      ))}
    </>
  );
}
