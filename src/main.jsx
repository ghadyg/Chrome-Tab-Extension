import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ChakraProvider } from '@chakra-ui/react'
import { Route, HashRouter as Router, Routes} from 'react-router-dom'
import Settings from './component/Settings.jsx'
import Feedback from './component/Feedback.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <ChakraProvider>
        <Router>
          <Routes>
            <Route path='/' element = {<App/>}></Route>
            <Route path='settings' element = {<Settings/>}></Route>
            <Route path='feedback' element = {<Feedback/>}></Route>
          </Routes>
        </Router>
    </ChakraProvider>
  </React.StrictMode>,
)
