import {useState} from "react"; 
import { useLoaderData } from "react-router-dom";
 
 
function AssignUser() { 
 const task = useLoaderData();
 const [taskTitle, setTaskTitle] = useState(task.taskTitle); 
 const [taskDesc, setTaskDesc] = useState(task.taskDesc);
 const [taskStatus, setStatus] = useState(task.taskStatus);
 const [taskUser, settaskUser] = useState("");
 
 console.log(taskUser);
 const clearForm = () => { 
    setTaskTitle(""); 
    setTaskDesc(""); 
    setStatus(""); 
 }; 
 
 const handleSubmit = (e) => { 
   e.preventDefault(); 
   const task = { taskTitle, taskDesc, taskStatus, taskUser };

   fetch('http://localhost:5000/tasks', {
        method: 'PUT',
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
   alert("Task Added User!"); 
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

            <div className="Field"> 
           <label> 
             Status <sup>*</sup> 
           </label> 
           <select value={taskStatus} onChange={(e) => setStatus(e.target.value)}> 
             <option value="role">Role</option> 
             <option value="individual">Completed</option> 
             <option value="business">Not Completed</option> 
           </select> 
         </div> 

            <div className="Field"> 
              <label>User Search</label> 
              <input 
                 value={taskUser} 
                 onChange={async (e) => { 
                     const searchQuery = e.target.value;
                     settaskUser(searchQuery);
                     
                     if (searchQuery.length > 2) {
                        try {
                          const response = await fetch(`http://localhost:5000/users?firstName=${searchQuery}`);
                          const users = await response.json();
                          
                          if (users.length > 0) {
                             settaskUser(users[0].id);
                          } else {
                             settaskUser("");
                          }
                        } catch (error) {
                          console.error("Error fetching users:", error);
                        }
                     }
                 }} 
                 placeholder="Search User By Name" 
              /> 
            </div> 
            <button type="submit"> 
              Updated Task 
            </button> 
         </fieldset> 
      </form> 
    </div> 
 ); 
} 

export default AssignUser; 