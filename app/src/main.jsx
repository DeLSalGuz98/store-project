import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import {App} from './App'
import { NotFound } from './pages/notFound'
import { Home } from './pages/home';
import { Login } from './pages/login';
import { Signup } from './pages/signup';
import { UserPage } from './pages/userPage';
import { SeeProducts } from './pages/seeProducts';
import { CreateStore } from './pages/createStore';
import { EditUser } from './pages/editUser';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App/>,
    errorElement: <NotFound/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/signup",
        element: <Signup/>,
      },
      {
        path: "/store",
        element: <UserPage/>,
        children:[
          {
            path: "/store",
            element: <SeeProducts/>
          },
          {
            path: "/store/create-store",
            element: <CreateStore/>,
          },
          {
            path: "/store/edit-user",
            element: <EditUser/>,
          },
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
