import React, { useState, useEffect } from 'react';

export default function Countdown(props) {
  const { targetDate } = props;
  const calculateTimeLeft = () => {
    const difference = new Date(targetDate) - new Date();
    let timeLeft = {};

    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((difference % (1000 * 60)) / 1000),
      };
    }

    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  });

  return (
    <div className='flex gap-3'>
      {timeLeft.days > 0 && <div className='text-4xl font-bold'>{timeLeft.days}<span className='text-sm text-gray-400'>hari</span></div>}
      <div className='text-4xl font-bold'>{timeLeft.hours}<span className='text-sm text-gray-400'>jam</span></div>
      <div className='text-4xl font-bold'>{timeLeft.minutes}<span className='text-sm text-gray-400'>menit</span></div>
      <div className='text-4xl font-bold'>{timeLeft.seconds}<span className='text-sm text-gray-400'>detik</span></div>
    </div>
  );
}