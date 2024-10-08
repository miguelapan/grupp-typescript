import LoginForm from './components/forms/LoginForm'
import Navbar from './components/Navbar'
import { useAuth } from './services/authProvider';
import './styles/main.css'
import { Outlet } from 'react-router-dom'

function App() {

  const { isAuth, setIsAuth, setUser} = useAuth();

  const handleLogout = () => {
    setIsAuth(false);
    setUser(null);
  }

  return (
    <>
    <div className='grid-schema container'>
      <header>VÄLKOMMEN TILL FORUMET</header>
      <Navbar />
      {isAuth ? 
      <div>
        <p>YOU ARE LOGGED IN</p>
        <button onClick={handleLogout}>LOG OUT</button>
      </div> 
      : <LoginForm />}
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
