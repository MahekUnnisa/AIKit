import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Navbar, Summarizer, ImageGen } from './components'

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app'>
        <Navbar />
        <Routes>
          <Route path="/" element={<Summarizer />} />
          <Route path="/ai-image-generator" element={<ImageGen />} />
        </Routes>
      </div>
    </main>
  )
}

export default App