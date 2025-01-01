import React from 'react'
import { useState, useEffect} from 'react';
function Inputs() {
    const [task, setTask] = useState('');
    const [todos, setTodos] = useState([]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await fetch('http://localhost:8000/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ task }),
          });
          if (response.ok) {
            console.log('Task created successfully');
            setTask(''); // Clear the input field after successful submission
          } else {
            console.error('Failed to create task');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
      
      useEffect(() => {
        fetch("http://localhost:8000/")
          .then((res) => res.json())
          .then((data) => setTodos(data));
      }, []);

  return (
    <div>
     <form onSubmit={handleSubmit}>
      <input type="Text" placeholder='Add task'  value={task} onChange={(e) => setTask(e.target.value)}></input>
      <input type="submit" value="Submit"></input>
      </form>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  )
}

export default Inputs
