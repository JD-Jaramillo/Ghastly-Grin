import React, { useState } from "react";
import io from "socket.io-client"
import Header from "../src/components/Header/index";
import Footer from './components/Footer';
import LogSign from "../src/components/LogSign";
import CreateGame from "../src/components/CreateGame";
import './App.css';
const socket = io.connect("127.0.0.1:3001/");

function App() {
  const [apiFetch, setApiFetch] = useState();

  const callAPI = () => {
    fetch("http://localhost:3001/testAPI")
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
        <LogSign />
        <CreateGame />
        <Footer />
    </div>
  );
}

export default App;
