import LoginForm from './components/forms/LoginForm'
import Navbar from './components/Navbar'
import { useAuth } from './services/authProvider';
import './styles/main.css'
import { Outlet } from 'react-router-dom'

function App() {

  const { isAuth, setIsAuth, setUser, user} = useAuth();

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
        <p>YOU ARE LOGGED IN AS {user?.userName}</p>
        <button onClick={handleLogout}>LOG OUT</button>
      </div> 
      : <LoginForm />}
      <main>
        <Outlet />
      </main>
      <footer>
        <p>@MIGUEL</ p>
      </footer>
    </div>
    </>
  )
}

export default App
