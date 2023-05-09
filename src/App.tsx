
import ResponsiveAppBar from './components/AppBar'
import { Routes ,Route } from 'react-router-dom'
import BlankPage from './components/BlankPage'
import CardContainer from './components/CardContainer'
// import testBoard from './components/test'

function App() {
  return (
    <>
    <ResponsiveAppBar/>
    <Routes>
      
      <Route path='/' element={<CardContainer/>} />
      <Route path='/Profile' element={<BlankPage/>} />
      {/* <Route path='/test' element={<testBoard/>} /> */}
    </Routes>
    </>
  )
}

export default App