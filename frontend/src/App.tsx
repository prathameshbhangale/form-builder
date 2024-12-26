import Home from './pages/home'
import { Routes, Route , Router} from "react-router-dom"
import LoginPage from './pages/login'
import SignUpPage from './pages/signin'
import Forms from './pages/forms'
import Navbar from './components/common/Navbar'
import CreateFormPage from './pages/createform'
import FormField from './pages/formField'

function App() {


  return (
    <>
    <Navbar></Navbar>
    <div className="App">
        <Routes>
          <Route path="/" element={ <Home/> } />
          <Route path="/login" element={ <LoginPage/> } />
          <Route path="/signin" element={ <SignUpPage/> } />
          <Route path="/createForm" element={<CreateFormPage />} />
          <Route path="/forms" element={<Forms />}/>
          <Route path="/setField/:formid" element={<FormField/>}/>
        </Routes>
    </div>
    </>
  )
}

export default App
