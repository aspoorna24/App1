import React, { useState,useEffect } from 'react'
import Inputs from './Inputs'
import { MdDeleteForever } from "react-icons/md";
import { ToastContainer, toast } from 'react-toastify';
import { RiCheckboxCircleLine,  RiCheckboxCircleFill } from "react-icons/ri";
function Home() {
    const [todos, setTodos] = useState([]);

   

    useEffect(() => {
      fetch("http://localhost:5000/")
        .then((res) => res.json())
        .then((data) => setTodos(data));
    }, []);

    const taskTick = async(id)=>{

      try{
        const repsones = await fetch(`http://localhost:5000/update/${id}`,{
            method:'PUT',
            headers:{
              'Content-Type':'application/json',
            },
            body: JSON.stringify({ id })
      });
      if (repsones){
        const result = await repsones.json();
        toast.success('Task completed')
        setTimeout(()=>{
          window.location.reload();
        },1000)  
      
      }
      else{
        console.error('Failed to update taks',repsones.status)
      }
    }
    catch(error){
      console.error("Error while updateing")
   }
  } 
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
            {
              todo.done? 
              <RiCheckboxCircleFill  style={{padding:'0px 5px'}} />
             : 
             <RiCheckboxCircleLine onClick={()=>taskTick(todo._id)} style={{padding:'0px 5px'}} />
            } 
            <span className={todo.done ? "line" : "noline"}>{todo.task} </span><MdDeleteForever onClick={()=>deleteTask(todo._id)} style={{fontSize:'25px',position:'absolute',right:'0',padding:' 0px 5px'}} className='deleteicon' />
          
            </div>)

        ))

    }
    <ToastContainer />
    </div>
    </div>
    
  )
}

export default Home
