import React, { useEffect, useRef } from 'react';
import './style.css';



function Timer(props) {
  const timerTime = useRef();
  
  useEffect(() => {
    timerTime.current.textContent = props.timer;
    let timerCount = props.timer;

   
      setInterval(function() {
        timerCount--;
        timerTime.current.textContent = timerCount;
        
      }, 1000);
      
  
  },[props.timer]);


    return (
        
          <div className="timer-container">
            <h5 ref={timerTime} className="timer"> </h5>
            <img id='timerImg' src="/GhastlyGrinLogoTrans_purple.png" alt=""/>
          </div>
        
    )
}

export default Timer