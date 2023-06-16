import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {
  BrowserRouter,
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import { AuthProvider } from 'react-auth-kit';
import refreshApi from "./refreshApi";


// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//   },
//   {
//     path: "/courses/:slug",
//     element: <CourseContent />, 
//   },
  
//   {
//     path:"/login",
//     element:<Login />,
//   },
//   {
//     path:"/register",
//     element:<Register />,
//   },
//   {
//     path:"about",
//     element: <About />,
//   },
//   {
//     path:"contact",
//     element:<Contact />
//   },
//   {
//     path:"dashboard",
//     element:<Dashboard />
//   },
//   {
//     path:"/courses/:slug/topic/:id",
//     element:<TopicContent />
//   }
  
// ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>

      <AuthProvider authType = {'cookie'}
      authName={'_auth'}
      cookieDomain={window.location.hostname}
      cookieSecure={false}
      refresh={refreshApi}
      >
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </AuthProvider>


    {/* <RouterProvider router={router} /> */}
    </React.StrictMode>
);


