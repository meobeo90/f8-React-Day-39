import { BrowserRouter as Router, Route, Routes } from 'react-router';
import './App.css'
import TodoApp from './pages/TodoApp';

function App() {
  return (
    <Router basename='/f8-React-Day-39'>
      <Routes>
        <Route index element={<TodoApp/>}>

        </Route>
      </Routes>
    </Router>
  )
}
export default App;