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
    <div>
      <div>
        <input
          type='number'
          value={hours}
          onChange={(e) => setHours(Number(e.target.value))}
          placeholder='Hours'
          min='0'
          max='23'
        />
        <input
          type='number'
          value={minutes}
          onChange={(e) => setMinutes(Number(e.target.value))}
          placeholder='Minutes'
          min='0'
          max='59'
        />
        <input
          type='number'
          value={seconds}
          onChange={(e) => setSeconds(Number(e.target.value))}
          placeholder='Seconds'
          min='0'
          max='59'
        />
      </div>
      <h2>Time Left {formatTime(timeLeft)}</h2>
      <button onClick={startTimer} disabled={isRunning}>
        {timeLeft === 0 ? 'Start' : 'Resume'}
      </button>
      <button onClick={pauseTimer} disabled={!isRunning}>
        Pause
      </button>
      <button onClick={resetTimer}>Reset</button>
    </div>
  );
}
