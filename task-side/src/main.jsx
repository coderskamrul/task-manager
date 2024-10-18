import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider,} from "react-router-dom";
import Tasks from './component/Tasks.jsx';
import NavBer from './component/NavBer.jsx';
import SignIn from './component/SignIn.jsx';
import Login from './component/Login.jsx';
import AssignUser from './component/AssignUser.jsx';


const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    loader: () => fetch( 'http://localhost:5000/tasks' )
  },
  {
    path: "/tasks",
    element: <Tasks/>,
  },
  {
    path: "/signin",
    element: <SignIn/>,
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/assign/:id",
    element: <AssignUser/>,
    loader: ({params}) => fetch( `http://localhost:5000/assign/${params.id}` )
  },
  {
    // path: "/update/:id",
    // element: <Updated/>,
    // loader: ({params}) => fetch( `http://localhost:5000/update/${params.id}` )
  },
]);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavBer/>
    <RouterProvider router={router} />
  </StrictMode>,
)
