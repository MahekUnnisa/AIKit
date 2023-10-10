import './App.css'
import { Hero, Demo, ImageGen } from './components'

const App = () => {
  return (
    <main>
      <div className='main'>
        <div className='gradient' />
      </div>

      <div className='app'>
        <Hero />
        {/* <Demo /> */}
        <ImageGen />
      </div>
    </main>
  )
}

export default App