import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';

import { createBrowserRouter,RouterProvider} from 'react-router-dom';
import App from './App.jsx';
import SignIn from './Components/SignIn/SignIn.jsx';
import SignUp from './Components/SignUp/SignUp.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/signIn",
    element: <SignIn/>
  },
  {
    path: "/signUp",
    element: <SignUp/>
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
