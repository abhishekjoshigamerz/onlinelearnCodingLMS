import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import CourseContent from './components/CourseContent/CourseContent';
import TopicContent from './components/CourseContent/TopicContent/TopicContent';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import About from './components/About/About';
import Contact from './components/Contact/Contact';
import Dashboard from './components/Dashboard/Dashboard';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from 'react-auth-kit';


<AuthProvider authType = {'cookie'}
authName={'_auth'}
cookieDomain={window.location.hostname}
cookieSecure={window.location.protocol === "https:"}>

</AuthProvider>
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
    path:"/login",
    element:<Login />,
  },
  {
    path:"/register",
    element:<Register />,
  },
  {
    path:"about",
    element: <About />,
  },
  {
    path:"contact",
    element:<Contact />
  },
  {
    path:"dashboard",
    element:<Dashboard />
  },
  {
    path:"/courses/:slug/topic/:id",
    element:<TopicContent />
  }
  
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
    <RouterProvider router={router} />
    </React.StrictMode>
);


