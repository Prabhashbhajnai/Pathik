import ReactDom from 'react-dom/client'
import ContextProvider from './context/contextProvider'
import App from './App'

ReactDom.createRoot(document.getElementById('root')).render(
    <ContextProvider>
        <App />
    </ContextProvider>
)