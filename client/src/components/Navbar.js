import React from 'react';
import { useAuthContext } from '../context/authContext';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import { useTodo } from '../context/todoContext';
import '../App.css';

const Navbar = () => {
  const { user, dispatch: dispatchUser } = useAuthContext();
  const { dispatch } = useTodo();
  return (
    <div
      style={{
        height: 40,
        width: '100vw',
        padding: 32,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 1000,
      }}
    >
      <Link to='/' className='nav'>
        Task Manager
      </Link>
      <div style={{ display: 'flex', gap: '16px' }}>
        {!user && (
          <Link
            to='/login'
            style={{ textDecoration: 'none', color: '#0077b6' }}
          >
            Login
          </Link>
        )}
        {!user && (
          <Link
            to='/signup'
            style={{ textDecoration: 'none', color: '#0077b6' }}
          >
            Signup
          </Link>
        )}
      </div>
      {user && (
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div>{user.email}</div>
          <Button
            variant='contained'
            onClick={() => {
              localStorage.removeItem('user');
              dispatchUser({ type: 'LOGOUT' });
              dispatch({ type: 'SET_TODOS', payload: null });
            }}
          >
            Logout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Navbar;
