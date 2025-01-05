import React, { useState,useEffect } from 'react'
import Inputs from './Inputs'
import { MdDeleteForever } from "react-icons/md";
function Home() {
    const [todos, setTodos] = useState([]);

    useEffect(() => {
      fetch("https://app1-omega-self.vercel.app/")
        .then((res) => res.json())
        .then((data) => setTodos(data));
    }, []);

    const deleteTask = async(id) =>{
          try{
            const repsones = await fetch(`https://app1-omega-self.vercel.app/delete/${id}`,{
            method:'DELETE',
            headers:{
              'Content-Type':'application/json',
            }
            });
            if (repsones){
              const result = await repsones.json();
              console.log('Task deleted',result)
              window.location.reload();
            }
            else{
              console.error('Failed to delete taks',repsones.status)
            }
          }
          catch(error){
             console.error("Error while deleting")
          }
    }
    
  return (
    <div>
   
    <Inputs></Inputs>
    {
        todos.lenght === 0
        ?
       ( <div><h2>No Record</h2></div> )
        :
       ( todos.map(todo => (
            <div>

            {todo.task} <MdDeleteForever onClick={()=>deleteTask(todo._id)} />
            </div>)
        ))

    }
    </div>
  )
}

export default Home
