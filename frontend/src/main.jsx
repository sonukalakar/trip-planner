import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import CreateTrip from './pages/create-trip/Index'
import toast, { Toaster } from 'react-hot-toast';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { Layout } from 'lucide-react'
import Home from './pages/Home'
import ViewTrip from './pages/view-trip/[tripid]'

const router = createBrowserRouter([
  {
    path: "/",
    element : <App />,
    children : [
      {
         path : "/",
         element : <Home />
      },
      {
         path : "/create-trip",
         element : <CreateTrip />
      },
      {
         path : "/view-trip/:tripid",
         element : <ViewTrip />
      }
    ]
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}>
      <Toaster position="top-center" reverseOrder={false}/>
      <RouterProvider  router={router}  />
    </GoogleOAuthProvider>
  </StrictMode>,
)
