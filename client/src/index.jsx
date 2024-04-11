import ReactDom from 'react-dom/client'
import ContextProvider from './context/ContextProvider'
import App from './App'
import './index.css'

ReactDom.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <App />
    </ContextProvider>
)