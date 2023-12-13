import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { UserProvider } from './UserProvider.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
 <UserProvider>
  <App />
</UserProvider>,
)
