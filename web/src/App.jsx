import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import '@/App.css'
import RootNavigator from '../Navigator/RootNavigator';


function App() {
  const [count, setCount] = useState(0)

return <RootNavigator/>

}

export default App
