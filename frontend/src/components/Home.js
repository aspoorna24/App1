import React, { useState,useEffect } from 'react'
import Inputs from './Inputs'
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
function Home() {
    const [todos, setTodos] = useState([]);

   

    useEffect(() => {
      fetch("http://localhost:5000/")
        .then((res) => res.json())
        .then((data) => setTodos(data));
    }, []);

    const deleteTask = async(id) =>{
          try{
            const repsones = await fetch(`http://localhost:5000/delete/${id}`,{
            method:'DELETE',
            headers:{
              'Content-Type':'application/json',
            }
            });
            if (repsones){
              const result = await repsones.json();
              toast.success('Task deleted')
              setTimeout(()=>{
                window.location.reload();
              },2000)  
            
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
    <div >
   
    <Inputs></Inputs>
    <div style={{textAlign:'center'}}>
    {
        todos.lenght === 0
        ?
       ( <div><h2>No Record</h2></div> )
        :
       ( todos.map(todo => (
            <div className="todo">

            {todo.task} <MdDeleteForever onClick={()=>deleteTask(todo._id)} style={{fontSize:'25px',position:'absolute',right:'0',padding:' 0px 5px'}} className='deleteicon' />
          
            </div>)

        ))

    }
    <ToastContainer />
    </div>
    </div>
    
  )
}

export default Home
