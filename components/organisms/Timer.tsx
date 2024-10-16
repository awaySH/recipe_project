import { useEffect, useRef, useState } from 'react';

interface TimerProps {
  onTimeUp?: () => void;
}

export default function Timer({ onTimeUp }: TimerProps) {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [seconds, setSeconds] = useState<number>(0);
  const [isRunning, setIsRunning] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const startTimer = () => {
    if (timeLeft === 0) {
      const totalSeconds = hours * 3600 + minutes * 60 + seconds;
      setTimeLeft(totalSeconds);
    }
    setIsRunning(true);
    intervalRef.current = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(intervalRef.current!);
          setIsRunning(false);
          if (onTimeUp) onTimeUp();
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
  };

  const pauseTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
  };

  const resetTimer = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    setIsRunning(false);
    setTimeLeft(0);
    setHours(0);
    setMinutes(0);
    setSeconds(0);
  };

  const formatTime = (time: number): string => {
    const h = Math.floor(time / 3600);
    const m = Math.floor((time % 3600) / 60);
    const s = time % 60;
    return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  return (
    <div className='max-w-md mx-auto bg-white rounded-lg overflow-hidden p-6 shadow-md'>
      <div className='mb-6 flex justify-between items-center'>
        <div>
          <input
            type='number'
            defaultValue={hours}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/^0+/, '');
              setHours(inputValue === '' ? 0 : Number(inputValue));
            }}
            onBlur={(e) => {
              const value = Math.min(Math.max(Number(e.target.value), 0), 23);
              setHours(value);
              e.target.value = value.toString();
            }}
            placeholder='Hours'
            min='0'
            max='23'
            className='w-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500'
          />
          <span className='ml-1 font-semibold text-gray-700'>시</span>
        </div>
        <div>
          <input
            type='number'
            defaultValue={minutes}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/^0+/, '');
              setMinutes(inputValue === '' ? 0 : Number(inputValue));
            }}
            onBlur={(e) => {
              const value = Math.min(Math.max(Number(e.target.value), 0), 23);
              setMinutes(value);
              e.target.value = value.toString();
            }}
            placeholder='Minutes'
            min='0'
            max='59'
            className='w-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500'
          />
          <span className='ml-1 font-semibold text-gray-700'>분</span>
        </div>
        <div>
          <input
            type='number'
            defaultValue={seconds}
            onChange={(e) => {
              const inputValue = e.target.value.replace(/^0+/, '');
              setSeconds(inputValue === '' ? 0 : Number(inputValue));
            }}
            onBlur={(e) => {
              const value = Math.min(Math.max(Number(e.target.value), 0), 23);
              setSeconds(value);
              e.target.value = value.toString();
            }}
            placeholder='Seconds'
            min='0'
            max='59'
            className='w-24 px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500'
          />
          <span className='ml-1 font-semibold text-gray-700'>초</span>
        </div>
      </div>
      <h2 className='text-3xl font-bold text-center mb-6 text-gray-800'>
        {formatTime(timeLeft)}
      </h2>
      <div className='flex justify-center space-x-4'>
        <button
          onClick={startTimer}
          disabled={isRunning}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            isRunning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-500 hover:bg-green-600'
          }`}
        >
          {timeLeft === 0 ? 'Start' : 'Resume'}
        </button>
        <button
          onClick={pauseTimer}
          disabled={!isRunning}
          className={`px-4 py-2 rounded-lg font-semibold text-white ${
            !isRunning
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-yellow-500 hover:bg-yellow-600'
          }`}
        >
          Pause
        </button>
        <button
          onClick={resetTimer}
          className='px-4 py-2 rounded-lg font-semibold text-white bg-red-500 hover:bg-red-600'
        >
          Reset
        </button>
      </div>
    </div>
  );
}
