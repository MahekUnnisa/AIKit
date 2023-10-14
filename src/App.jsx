import { Navbar, Summarizer, ImageGen, Footer } from './components'
import { Route, Routes } from 'react-router-dom'
import './App.css'

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
        <Footer />
      </div>
    </main>
  )
}

export default App