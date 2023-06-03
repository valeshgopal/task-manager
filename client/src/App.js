import './App.css';
import { Routes, Route, Navigate } from 'react-router-dom';
import Todo from './components/Todo';
import Signup from './components/Signup';
import Login from './components/Login';
import { useAuthContext } from './context/authContext';
import Navbar from './components/Navbar';

function App() {
  const { user } = useAuthContext();

  return (
    <div className='App'>
      <Navbar />
      <Routes>
        <Route
          exact
          path='/'
          element={user ? <Todo /> : <Navigate to='/login' />}
        />
        <Route
          path='/signup'
          element={!user ? <Signup /> : <Navigate to='/' />}
        />
        <Route
          path='/login'
          element={!user ? <Login /> : <Navigate to='/' />}
        />
      </Routes>
    </div>
  );
}

export default App;
