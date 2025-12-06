import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { Provider as ReduxProvider } from './libs/react-redux/index.js'
import store from './store/index.js'



createRoot(document.getElementById('root')).render(
    
  <ReduxProvider store = {store}>
    <App />
  </ReduxProvider>
)
