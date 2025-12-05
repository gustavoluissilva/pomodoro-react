import React, { useState, useEffect } from "react";

function DigitalClock() {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString("pt-BR", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });
  };

  return (
    <div className="digital-clock">
      <h2>Relógio Digital Atual</h2>
      <div style={{ fontSize: "3em", fontWeight: "bold" }}>
        {formatTime(currentTime)}
      </div>
    </div>
  );
}

export default DigitalClock;
