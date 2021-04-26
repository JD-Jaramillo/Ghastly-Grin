import React, { useEffect, useState } from 'react';
import './style.css';



function Timer(props) {
  const [counter, setCounter] = useState(props.timer);

  useEffect(() => {
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);



    return (
        
          <div className="timer-container">
            <h5 className="timer">{counter}</h5>
            <img id='timerImg' src="/GhastlyGrinLogoTrans_purple.png" alt=""/>
          </div>
        
    )
}

export default Timer