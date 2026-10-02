
import { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  Box,
  Button,
  Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API from '../api/axios';
import TicketList from '../components/TicketList';
import TicketForm from '../components/TicketForm';
import API, { getCsrfToken } from '../api/axios';

function Home() {
  const navigate = useNavigate();

  const [openForm, setOpenForm] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleLogout = async () => {
    try {
      const csrfResponse = await API.get('users/csrf/');
      const csrfToken = await getCsrfToken();
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

  const handleTicketCreated = () => {
    setRefreshKey((prev) => prev + 1);
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
            TicketFlow
          </Typography>

          <Button
            color="inherit"
            onClick={() => setOpenForm(true)}
            sx={{
              fontWeight: 600,
              textTransform: 'none',
            }}
          >
            Create Ticket
          </Button>
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
              My Dashboard
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: '#CBD5E1' }}
              fontWeight={400}
            >
              Create and manage your support tickets. Track requests,
              monitor progress, and keep everything organized in one place.
            </Typography>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
              <Button
                variant="contained"
                size="large"
                onClick={() => setOpenForm(true)}
                sx={{
                  bgcolor: '#FACC15',
                  color: '#121212',
                  textTransform: 'none',
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#EAB308' },
                }}
              >
                Create a Ticket
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Box sx={{ pb: 6 }}>
          <Typography
            variant="h5"
            fontWeight={700}
            sx={{ color: '#FFFFFF', mb: 3 }}
          >
            My Tickets
          </Typography>

          <TicketList refreshKey={refreshKey} />
        </Box>

        <TicketForm
          open={openForm}
          onClose={() => setOpenForm(false)}
          onCreated={handleTicketCreated}
        />
      </Container>
    </Box>
  );
}

export default Home;
