import './App.css'
import AppRoutes from './routes/AppRoutes'
import { AuthProvider } from './components/Global/common'

function App() {
  return (
    <AuthProvider>
      <AppRoutes />
    </AuthProvider>
  )
}

export default App
