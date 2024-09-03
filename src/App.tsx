import LoginForm from './components/forms/LoginForm'
import Navbar from './components/Navbar'
import './styles/main.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
    <div className='grid-schema container'>
      <header>VÄLKOMMEN TILL FORUMET</header>
      <Navbar />
      <LoginForm />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>@ALEX AHMAD MIGUEL</ p>
        <p>Testing testing</p>
      </footer>
    </div>
    </>
  )
}

export default App
