import React, { useState } from 'react';
import { useAuthContext } from '../context/authContext';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { Link } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { dispatch } = useAuthContext();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const response = await fetch('/api/user/signup', {
      method: 'POST',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const user = await response.json();
    if (!response.ok) {
      setError(user.error);
      setLoading(false);
    }
    if (response.ok) {
      localStorage.setItem('user', JSON.stringify(user));
      dispatch({ type: 'LOGIN', payload: user });
      setLoading(false);
      setEmail('');
      setPassword('');
      setError('');
    }
  };

  React.useEffect(() => {
    setTimeout(() => {
      setError('');
    }, 3000);
  }, [error]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0077b6',
      }}
    >
      <Paper elevation={3} style={{ padding: 24, width: 360 }}>
        <form
          onSubmit={handleSubmit}
          style={{ display: 'flex', flexDirection: 'column', gap: 12 }}
        >
          <TextField
            id='outlined-basic'
            label='Email'
            variant='outlined'
            type='email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <TextField
            id='outlined-basic'
            label='Password'
            variant='outlined'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button variant='contained' disabled={loading} type='submit'>
            Signup
          </Button>

          <Link
            to='/login'
            style={{ textDecoration: 'none', color: '#0077b6' }}
          >
            <a>Already Registered? Login here</a>
          </Link>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
      </Paper>
    </Box>
  );
};

export default Signup;
