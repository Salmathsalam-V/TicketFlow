import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Alert,
} from '@mui/material';
import API, { getCsrfToken } from '../api/axios';

function Login() {

  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);


  const handleLogin = async (event) => {

    event.preventDefault();

    setError('');
    setLoading(true);

    try {

      
    const csrfToken = await getCsrfToken();

    const response = await API.post(
      'users/login/',
      { username, password },
      {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      }
    );


      const user = response.data.user;


      if (user.is_superuser) {

        navigate('/admin');

      } else {

        navigate('/dashboard');

      }

    } catch (error) {

      if (error.response) {

        setError(
          error.response.data.detail ||
          'Login failed.'
        );

      } else {

        setError('Unable to connect to the server.');

      }

    } finally {

      setLoading(false);

    }
  };


  return (
    <Container maxWidth="sm">
      {/* Back Navigation */}
       
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
        }}
      >

        <Paper
          elevation={3}
          sx={{
            width: '100%',
            padding: 4,
          }}
        >
           <Button
              onClick={() => navigate('/')}
              sx={{ mb: 2 }}
            >
              ← Back to Home
            </Button>
          <Typography
            variant="h4"
            sx={{ mb: 1 }}
          >
            Login
          </Typography>

          <Typography
            color="text.secondary"
            sx={{ mb: 3 }}
          >
            Sign in to your TicketFlow account.
          </Typography>


          {error && (
            <Alert
              severity="error"
              sx={{ mb: 2 }}
            >
              {error}
            </Alert>
          )}


          <Box
            component="form"
            onSubmit={handleLogin}
          >

            <TextField
              fullWidth
              label="Username"
              value={username}
              onChange={(event) =>
                setUsername(event.target.value)
              }
              margin="normal"
            />


            <TextField
              fullWidth
              label="Password"
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
              margin="normal"
            />


            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{ mt: 3 }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </Button>

          </Box>

        </Paper>

      </Box>

    </Container>
  );
}


export default Login;
