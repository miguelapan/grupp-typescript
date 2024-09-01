import Navbar from './components/Navbar'
import './styles/main.css'
import { Outlet } from 'react-router-dom'

function App() {

  return (
    <>
    <div className='grid-schema'>
      <header>VÄLKOMMEN TILL FORUMET</header>
      <Navbar />
      <main>
        <Outlet />
      </main>
      <footer>
        <p>@ALEX AHMAD MIGUEL</ p>
      </footer>
    </div>
    </>
  )
}

export default App
