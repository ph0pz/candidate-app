import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles"
import theme from "./initTheme"

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(


  <React.StrictMode>
    <BrowserRouter>
    <CssVarsProvider theme={theme}>
    <App />
    </CssVarsProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
