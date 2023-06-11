import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CourseContent from './components/CourseContent/CourseContent';
import TopicContent from './components/CourseContent/TopicContent/TopicContent';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/courses/:slug",
    element: <CourseContent />,
  },
  {
    path:"/courses/:slug/:id",
    element:<TopicContent />,
  },
  {
    path:"/login",
    element:<Login />,
  },
  {
    path:"/register",
    element:<Register />,
  }
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


