import React, { useState } from "react";
import io from "socket.io-client"
import Header from "../src/components/Header/index";
import './App.css';
import Footer from './components/Footer';
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
        <Footer />
    </div>
  );
}

export default App;
