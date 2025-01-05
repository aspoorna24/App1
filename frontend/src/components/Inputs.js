import React from 'react'
import { useState} from 'react';
import { ToastContainer, toast } from 'react-toastify';
function Inputs() {
    const [task, setTask] = useState('');
  
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:5000/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
          });
          if (response.ok) {
            toast.success("Task Created")
            setTask(''); // Clear the input field after successful submission
            setTimeout(()=>{
              window.location.reload();
            },3000);
           
          } else {
            console.error('Failed to create task');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      

  return (
    <div>
     <form onSubmit={handleSubmit}>
      <input type="text" placeholder='Add task'  value={task} onChange={(e) => setTask(e.target.value)}></input>
      <input type="submit" value="Add Task"></input>
      <ToastContainer />
      </form>
     
    </div>
  )
}

export default Inputs
