import './App.css';
import Home from './components/Home';
import { useEffect, useState } from "react";
function App() {
  const [message, setMessage] = useState("");
  
    fetch("http://localhost:5000/api")
    .then((res) =>res.json())
    .then((data)=>setMessage(data.message));
  return (
    <div>
      <h1>{message}</h1>
      <Home></Home>
      
    </div>
  );
}

export default App;
