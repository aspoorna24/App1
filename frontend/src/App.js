import './App.css';
import Home from './components/Home';
import { useState } from "react";

function App() {
  const [message, setMessage] = useState("");
  
    fetch("https://app1-omega-self.vercel.app/api")
    .then((res) =>res.json())
    .then((data)=>setMessage(data.message));

  
  return (
    <div>
      <h1 >{message}</h1>
      <Home></Home>
     
    </div>
  );
}

export default App;
