import ReactDom from 'react-dom/client'
import ContextProvider from './context/ContextProvider'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'

ReactDom.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
        <ContextProvider>
            <App />
        </ContextProvider>
    </BrowserRouter>
)