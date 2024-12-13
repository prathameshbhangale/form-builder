import Home from './pages/home'
import { Routes, Route } from "react-router-dom"
import LoginPage from './pages/login'
import SignUpPage from './pages/signin'

function App() {


  return (
    <div className="App">
      <Routes>
      <Route path="/" element={ <Home/> } />
      <Route path="/login" element={ <LoginPage/> } />
      <Route path="/signin" element={ <SignUpPage/> } />

      </Routes>
      
    </div>
  )
}

export default App
