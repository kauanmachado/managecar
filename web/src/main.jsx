import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import Layout from './components/layout.jsx'
import Routers from './routes.jsx'
import { UserProvider } from './contexts/user-provider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserProvider>
    <Layout>
      <Routers />
    </Layout> 
    </UserProvider>
  </StrictMode>,
)
