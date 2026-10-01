import { useState } from 'react';
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  Alert,
  Link,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');

  const handleChange = (event) => {
    setForm({
      ...form,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    if (form.password !== form.confirm_password) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('users/register/', form);
      setSuccess(response.data.message);
      setTimeout(() => navigate('/login'), 1500);
    } catch (err) {
      const detail = err.response?.data?.detail;
      setError(
        Array.isArray(detail)
          ? detail.join(' ')
          : detail || 'Registration failed. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        bgcolor: '#fdfafa',
        py: 5,
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={0}
          sx={{
            p: { xs: 3, sm: 5 },
            borderRadius: 4,
            border: '1px solid #E2E8F0',
            bgcolor: '#FFFFFF',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={800}
            color="#FACC15"
            textAlign="center"
            mb={1}
          >
            TicketFlow
          </Typography>

          <Typography
            variant="h5"
            fontWeight={700}
            textAlign="center"
            mb={1}
            sx={{ color: '#121212' }}
          >
            Create your account
          </Typography>

          <Typography
            sx={{ color: '#64748B' }}
            textAlign="center"
            mb={3}
          >
            Register to start managing your tickets.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 2 }}>
              {success}
            </Alert>
          )}

          <Box
            component="form"
            onSubmit={handleSubmit}
            className="dashboard-content"
          >
            <Stack spacing={2}>
              <TextField
                label="Username"
                name="username"
                value={form.username}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                required
                fullWidth
              />

              <TextField
                label="Confirm password"
                name="confirm_password"
                type="password"
                value={form.confirm_password}
                onChange={handleChange}
                required
                fullWidth
              />

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  py: 1.4,
                  bgcolor: '#FACC15',
                  color: '#121212',
                  textTransform: 'none',
                  fontWeight: 700,
                  '&:hover': {
                    bgcolor: '#EAB308',
                  },
                }}
              >
                {loading ? 'Creating account...' : 'Register'}
              </Button>
            </Stack>
          </Box>

          <Typography
            textAlign="center"
            mt={3}
            sx={{ color: '#64748B' }}
          >
            Already have an account?{' '}
            <Link
              component="button"
              type="button"
              underline="hover"
              onClick={() => navigate('/login')}
              sx={{
                color: '#121212',
                fontWeight: 600,
              }}
            >
              Login
            </Link>
          </Typography>

          <Box textAlign="center" mt={2}>
            <Link
              component="button"
              type="button"
              underline="hover"
              onClick={() => navigate('/')}
              sx={{
                color: '#64748B',
                '&:hover': {
                  color: '#121212',
                },
              }}
            >
              Back to Home
            </Link>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Register;