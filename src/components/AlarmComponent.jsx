import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import './Alarm.css';
function Alarm() {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    let timer;
    if (isRunning && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds > 0) {
          setSeconds((prev) => prev - 1);
        } else if (minutes > 0) {
          setMinutes((prev) => prev - 1);
          setSeconds(59);
        }
      }, 1000);
    } else if (isRunning && minutes === 0 && seconds === 0) {
      setShowConfetti(true);
      setIsRunning(false);

      setTimeout(() => {
        setShowConfetti(false);
      }, 9000);
    }

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  const startTimer = () => {
    if (minutes > 0 || seconds > 0) {
      setIsRunning(true);
    }
  };

  const pauseTimer = () => {
    if (minutes > 0 || seconds > 0) {
      setIsRunning(false);
    }
  };

  const resetTimer = () => {
    setIsRunning(false);
    setMinutes(0);
    setSeconds(0);
    setShowConfetti(false);
  };

  const addTimer = (minute) => {
    setMinutes((prevTime) => prevTime + minute);
  };

  const addSeconds = (second) => {
    setSeconds((prevSeconds) => {
      const totalSeconds = prevSeconds + second;
      const newMinutes = Math.floor(totalSeconds / 60); // Convert to minutes
      const newSeconds = totalSeconds % 60; // Get the remaining seconds

      // Update minutes and seconds in one go
      setMinutes((prevMinutes) => prevMinutes + newMinutes); // Add minutes correctly
      return newSeconds; // Update seconds correctly
    });
  };

  const timerClass =
    isRunning && minutes === 0 && seconds <= 60 ? 'last-minute' : '';

  return (
    <div>
      {showConfetti && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}

      {isRunning && (
        <p className={`Timer ${timerClass}`}>
          Time Left: {minutes.toString().padStart(2, '0')}:
          {seconds.toString().padStart(2, '0')}
        </p>
      )}

      {!isRunning && (
        <p>
          Set a Timer to keep track on how long <br></br>you are playing or to
          keep track of a speedrun....
        </p>
      )}

      {!isRunning && (
        <input
          className='inputNumber'
          type="number"
          placeholder="enter"
          onChange={(e) => setMinutes(parseInt(e.target.value) || 0)}
        />
      )}

      <div className="QuickBtn">
        {isRunning && (
          <button onClick={() => addSeconds(30)}>+30 Seconds</button>
        )}
        {isRunning && <button onClick={() => addTimer(10)}>+10 Minutes</button>}
        {isRunning && <button onClick={() => addTimer(25)}>+25 Minutes</button>}
      </div>

      {!isRunning && <h3>Quick Timer</h3>}

      <div className="QuickBtn">
        {!isRunning && (
          <button
            onClick={() => {
              setMinutes(0);
              setSeconds(1);
              setIsRunning(true);
            }}
          >
            Test Confetti
          </button>
        )}

        {!isRunning && (
          <button
            onClick={() => {
              setMinutes(5);
              setSeconds(0);
              setIsRunning(true);
            }}
          >
            5 Minutes
          </button>
        )}

        {!isRunning && (
          <button
            onClick={() => {
              setMinutes(10);
              setSeconds(0);
              setIsRunning(true);
            }}
          >
            10 Minutes
          </button>
        )}

        {!isRunning && (
          <button
            onClick={() => {
              setMinutes(25);
              setSeconds(0);
              setIsRunning(true);
            }}
          >
            25 Minutes
          </button>
        )}

        {!isRunning && (
          <button
            onClick={() => {
              setMinutes(30);
              setSeconds(0);
              setIsRunning(true);
            }}
          >
            30 Minutes
          </button>
        )}

        {!isRunning && (
          <button
            onClick={() => {
              setMinutes(60);
              setSeconds(0);
              setIsRunning(true);
            }}
          >
            1 Hour
          </button>
        )}
      </div>

      {!isRunning ? (
        <button onClick={startTimer}>start timer</button>
      ) : (
        <button onClick={resetTimer}>reset</button>
      )}

      {isRunning && <button onClick={pauseTimer}> pause </button>}
    </div>
  );
}

export default Alarm;
