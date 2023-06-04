import React, { useEffect, useState } from 'react';
import { useTodo } from '../context/todoContext';
import { useAuthContext } from '../context/authContext';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import TextField from '@mui/material/TextField';
import { Box } from '@mui/material';
import Button from '@mui/material/Button';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Todo = () => {
  const [text, setText] = useState('');
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState('');
  const [loading, setLoading] = useState(true);
  const [taskCompleted, setTaskCompleted] = useState({
    id: '',
    success: false,
  });

  const { todos, dispatch } = useTodo();
  const { user } = useAuthContext();

  useEffect(() => {
    try {
      if (user) {
        setLoading(true);
        const getTodos = async () => {
          const response = await fetch('/api/todos', {
            headers: { 'Authorization': `Bearer ${user.token}` },
          });
          const data = await response.json();

          if (response.ok) {
            dispatch({ type: 'SET_TODOS', payload: data });
            setLoading(false);
          }
        };
        getTodos();
      }
    } catch (error) {
      console.log(error);
    }
  }, [dispatch, user]);

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/todos', {
      method: 'POST',
      body: JSON.stringify({ todo: text }),
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
    });

    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'CREATE_TODO', payload: data });
      toast.success('Added a new task', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setText('');
    }
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/todos/' + editId, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({ todo: text }),
    });
    const data = await response.json();

    if (response.ok) {
      dispatch({ type: 'UPDATE_TODO', payload: { ...data, todo: text } });
      toast.success('Task edited successfully', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      setEditMode(false);
      setText('');
    }
  };

  const handleDelete = async (id) => {
    if (id === editId) {
      toast.error('Finish editing the task', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }
    const response = await fetch('/api/todos/' + id, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${user.token}` },
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'DELETE_TODO', payload: data });
      toast.warn('Deleted the task successfully', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    }
  };

  const handleTaskComplete = async (id) => {
    const completedTask = todos.find((todo) => todo._id === id);
    setTaskCompleted(completedTask);

    const response = await fetch('/api/todos/' + id, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({
        ...completedTask,
        isCompleted: !completedTask.isCompleted,
      }),
    });
    const data = await response.json();
    if (response.ok) {
      dispatch({ type: 'UPDATE_TODO', payload: data });
      if (!completedTask.isCompleted) {
        toast.success('Task completed successfully!', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      } else {
        toast.warn('Undo task completion!', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
      }
    }
  };

  return (
    <div
      style={{
        width: '100%',
        minHeight: '100vh',
        backgroundColor: '#0077b6',
        display: 'flex',
        flexDirection: 'column',
        paddingTop: 100,
        alignItems: 'center',
        color: '#ffffff',
      }}
    >
      <form onSubmit={editMode ? handleEdit : onSubmit}>
        <div
          style={{ display: 'flex', alignItems: 'center', gap: 16, width: 500 }}
        >
          <Box
            sx={{
              width: '100%',
              maxWidth: '100%',
            }}
          >
            <TextField
              fullWidth
              id='fullWidth'
              type='text'
              value={text}
              placeholder='Enter a task...'
              onChange={(e) => setText(e.target.value)}
              required
              sx={{ input: { color: '#fff' } }}
            />
          </Box>

          <Button variant='contained' disabled={loading} type='submit'>
            {editMode ? 'Edit' : 'Add'}
          </Button>
        </div>
      </form>
      <div style={{ width: 500 }}>
        {loading && (
          <div style={{ marginTop: 16 }}>
            <img src='loader.svg' />
          </div>
        )}
        {!loading &&
          todos?.length > 0 &&
          todos.map((todo) => {
            return (
              <div
                key={todo._id}
                style={{
                  width: '100%',
                  display: 'flex',
                  justifyContent: 'space-between',
                  background: '#fff',
                  padding: 16,
                  marginTop: 12,
                  marginBottom: 12,
                  color: '#000',
                  borderRadius: 5,
                  flexWrap: 'wrap',
                  wordBreak: 'break-word',
                }}
              >
                <div
                  style={{
                    width: '80%',
                    textAlign: 'left',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                  }}
                >
                  <input
                    type='checkbox'
                    checked={todo.isCompleted}
                    onChange={() => handleTaskComplete(todo._id)}
                  />
                  <p
                    style={
                      todo.isCompleted
                        ? { textDecoration: 'line-through', color: 'grey' }
                        : {}
                    }
                  >
                    {todo.todo}
                  </p>
                </div>

                <div style={{ display: 'flex' }}>
                  <div
                    onClick={() => {
                      setEditMode(true);
                      setEditId(todo._id);
                      setText(todo.todo);
                    }}
                  >
                    <EditIcon style={{ color: 'blue' }} />
                  </div>
                  <div onClick={() => handleDelete(todo._id)}>
                    <DeleteIcon style={{ color: 'red' }} />
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      <ToastContainer />
    </div>
  );
};

export default Todo;
