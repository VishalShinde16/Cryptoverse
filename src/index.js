import React from 'react'
import {createRoot} from 'react-dom/client'

import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

const root = createRoot(document.getElementById('root')); // createRoot(container!) if you use TypeScript
root.render(<BrowserRouter><App/></BrowserRouter>);