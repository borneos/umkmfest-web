import { useState, useRef, ChangeEvent, KeyboardEvent, useEffect } from 'react';

const OTPInput = ({ isReset, isNumber, length = 6, onComplete, onChange }) => {
  const [otp, setOtp] = useState(new Array(length).fill(''));
  const inputRefs = useRef(Array(length).fill(null));

  const handleInputChange = (value, index) => {
    const val = isNumber ? value.replace(/[^0-9]/g, '') : value
    const newOtp = [...otp];
    newOtp[index] = val;
    setOtp(newOtp);
    
    if (val !== '' && index < length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    
    if (newOtp.every((digit) => digit !== '')) {
      onComplete(newOtp.join(''));
    }
    onChange(newOtp.join(''));
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && index > 0 && otp[index] === '') {
      inputRefs.current[index - 1]?.focus();
    }
  };

  useEffect(() => {
    if(isReset){
      setOtp(new Array(length).fill(''));
    }
  }, [isReset, length])

  return (
    <div className='flex justify-between'>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="number"
          maxLength={1}
          value={digit}
          onChange={(e) => handleInputChange(e.target.value, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          ref={(ref) => (inputRefs.current[index] = ref)}
          className='text-center h-[43px] w-[40px] md:h-[48px] md:w-[45px]'
          style={{ border: '2px solid #e4e4e7', borderRadius: '.8em', fontSize: '18px', fontWeight: 'bold' }}
        />
      ))}
    </div>
  );
};

export default OTPInput;