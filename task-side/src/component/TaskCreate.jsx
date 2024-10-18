import {useState} from "react"; 
 
 
function TaskCreate() { 
 const [taskTitle, setTaskTitle] = useState(""); 
 const [taskDesc, setTaskDesc] = useState(""); 
 
 
 const clearForm = () => { 
    setTaskTitle(""); 
    setTaskDesc(""); 
//    setRole("role"); 
 }; 
 
 const handleSubmit = (e) => { 
   e.preventDefault(); 
   const taskStatus = false;
   const taskUser = '';
   const task = { taskTitle, taskDesc, taskUser, taskStatus };

   fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
    })
   console.log(task);
   alert("Task is created!"); 
   clearForm(); 
 }; 
 
 return ( 
   <div className="App"> 
     <form onSubmit={handleSubmit}> 
       <fieldset> 
         <h2>Create Task</h2> 
         <div className="Field"> 
           <label> 
             Task Title <sup>*</sup> 
           </label> 
           <input 
             value={taskTitle} 
             onChange={(e) => { 
                setTaskTitle(e.target.value); 
             }} 
             placeholder="Task Title" 
           /> 
         </div> 
         <div className="Field"> 
           <label>Task Desc</label> 
           <input 
             value={taskDesc} 
             onChange={(e) => { 
                setTaskDesc(e.target.value); 
             }} 
             placeholder="Task Desc" 
           /> 
         </div> 
         <button type="submit"> 
           Create Task 
         </button> 
       </fieldset> 
     </form> 
   </div> 
 ); 
} 

export default TaskCreate; 