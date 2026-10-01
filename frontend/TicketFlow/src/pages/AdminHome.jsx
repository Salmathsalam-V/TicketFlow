
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  Box,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import TicketList from '../components/TicketList';
const csrfResponse = await API.get('users/csrf/');
const csrfToken = csrfResponse.data.csrfToken;

function AdminHome() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await API.post(
        'users/logout/',
        {},
        {
          headers: {
            'X-CSRFToken': csrfToken,
          },
        }
      );
      navigate('/login', { replace: true });
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#393131',
      }}
      className="dashboard-content"
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: '#958282', color: '#FFFFFF' }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto' }}>
          <Typography
            variant="h5"
            fontWeight={800}
            color="#FACC15"
            sx={{ flexGrow: 1 }}
          >
            TicketFlow Admin
          </Typography>
          <Button color="inherit" onClick={() => navigate('/profile')}>
              My Profile
          </Button>
          <Button
            color="inherit"
            onClick={handleLogout}
            sx={{
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Logout
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: '35vh',
            display: 'flex',
            alignItems: 'center',
            py: 6,
          }}
        >
          <Stack spacing={3} maxWidth={650}>
            <Typography
              variant="overline"
              color="#FACC15"
              fontWeight={700}
            >
              SIMPLE. ORGANIZED. EFFICIENT.
            </Typography>

            <Typography
              variant="h2"
              fontWeight={800}
              sx={{
                color: '#FFFFFF',
                fontSize: { xs: 36, sm: 46, md: 58 },
              }}
            >
              Admin Dashboard
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: '#CBD5E1' }}
              fontWeight={400}
            >
              View and monitor tickets submitted by all users.
              Manage support requests and keep track of their progress
              in one place.
            </Typography>
          </Stack>
        </Box>

        <Box sx={{ pb: 6 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: '#FFFFFF', mb: 3 }}
          >
            All Tickets
          </Typography>

          <TicketList adminMode />
        </Box>
      </Container>
    </Box>
  );
}

export default AdminHome;
