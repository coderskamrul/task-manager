import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import TaskCreate from './component/TaskCreate'
import { Link, useLoaderData } from 'react-router-dom'

function App() {

  const tasks = useLoaderData();
  return (
    <>
      <h1>Collaborative Task Manager</h1>
      <div className="task-wrapper">
      {
        tasks.map((task) => (
          <div className='task-lists' key={task.id}>
            <h4>{task.taskTitle}</h4>
            <p>{task.taskDesc}</p>
            <p>{task.taskStatus == 'false' ? 'Not Completed' : 'Completed'}</p>
            <Link to={`/assign/${task._id}`}>Assign User</Link>
          </div>
        ))
      }
      </div>
    </>
  )
}

export default App
