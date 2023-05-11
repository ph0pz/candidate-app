
import ResponsiveAppBar from './components/AppBar'
import { Routes ,Route } from 'react-router-dom'
import BlankPage from './pages/ProfilePage/BlankPage'
import ExampleDnDPage from './pages/MainBoard/ExampleDnDPage'
// import testBoard from './components/test'

function App() {
  return (
    <>
    <ResponsiveAppBar/>
    <Routes>
      
      <Route path='/' element={<ExampleDnDPage/>} />
      <Route path='/Profile' element={<BlankPage/>} />
      {/* <Route path='/test' element={<testBoard/>} /> */}
    </Routes>
    </>
  )
}

export default App