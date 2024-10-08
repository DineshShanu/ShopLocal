import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './routes/App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Bag from './routes/Bag.jsx';
import Home from './routes/Home.jsx';
import { Provider } from "react-redux";
import shoplocalStore from './store/index.js';
import "bootstrap/dist/css/bootstrap.min.css";

const router = createBrowserRouter([{
  path: "/",
  element: <App />,
  children: [
    { path: "/", element: <Home /> },
    {
      path: "/bag", element: <Bag />
    },
  ],
},
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={shoplocalStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
