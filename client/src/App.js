import React, { useState } from "react";
import io from "socket.io-client"
import Header from "../src/components/Header/index";
import './App.css';
const socket = io.connect("127.0.0.1:3001/");

function App() {
  const [apiFetch, setApiFetch] = useState();

  const callAPI = () => {
    fetch("http://localhost:9000/testAPI")
      .then(res => res.text())
      .then(res => setApiFetch(res))
  }

  
  callAPI();
  
  socket.emit("welcome", "connected");
  return (
    <div>
        <Header />
        <p>
          {apiFetch}
        </p>
    </div>
  );
}

export default App;
