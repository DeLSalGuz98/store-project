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
import { MyStores } from './pages/myStores';
import { EditUser } from './pages/editUser';
import { StorePage } from './pages/storePage';
import { AllProducts } from './pages/allProducts';
import { NewProduct } from './pages/newProduct';

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
        path: "/user",
        element: <UserPage/>,
        children:[
          {
            path: "/user",
            element: <SeeProducts/>
          },
          {
            path: "/user/create-store",
            element: <CreateStore/>,
          },
          {
            path: "/user/my-stores",
            element: <MyStores/>,
          },
          {
            path: "/user/edit-user",
            element: <EditUser/>,
          },
        ]
      },
      {
        path: "/store/:idStore",
        element: <StorePage/>,
        children:[
          {
            path: "/store/:idStore/all-products",
            element: <AllProducts/>,
          },
          {
            path: "/store/:idStore/new-product",
            element: <NewProduct/>,
          },
        ]
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />,
)
