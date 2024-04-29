import './App.css'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter } from 'react-router-dom';

function App() {

  return (
      <div className='bannerImage'>
        <Navbar/>
        <BrowserRouter>
        </BrowserRouter>
      </div>
  )
}

export default App
