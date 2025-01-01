import React from 'react'
import { useState, useEffect} from 'react';
import Task from './components/Task';
function Task() {
    const [todos, setTodos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);
  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.task}</li>
        ))}
      </ul>
    </div>
  )
}

export default Task
