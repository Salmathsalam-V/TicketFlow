import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Stack,
  Paper,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{ minHeight: '100vh', bgcolor: '#393131' }}
      className="dashboard-content"
    >
      <AppBar
        position="static"
        elevation={0}
        sx={{ bgcolor: '#958282', color: '#FFFFFF' }}
      >
        <Toolbar sx={{ maxWidth: 1200, width: '100%', mx: 'auto' }}>
          <Typography variant="h5" fontWeight={800} color="#FACC15">
            TicketFlow
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <Button color="inherit" onClick={() => navigate('/')}>
            Home
          </Button>
          <Button color="inherit" onClick={() => navigate('/about')}>
            About Us
          </Button>
          <Button color="inherit" onClick={() => navigate('/login')}>
            Login
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/register')}
            sx={{
              ml: 1,
              bgcolor: '#FACC15',
              color: '#121212',
              textTransform: 'none',
              fontWeight: 700,
              '&:hover': { bgcolor: '#EAB308' },
            }}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="lg">
        <Box
          sx={{
            minHeight: '75vh',
            display: 'flex',
            alignItems: 'center',
            py: 8,
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
              sx={{ color: '#FFFFFF', fontSize: { xs: 40, md: 58 } }}
            >
              Manage every ticket in one place.
            </Typography>

            <Typography
              variant="h6"
              sx={{ color: '#CBD5E1' }}
              fontWeight={400}
            >
              Track requests, monitor progress, and stay organized with
              TicketFlow, a simple way to manage support tickets.
            </Typography>

            <Stack
              direction={{ xs: 'column', sm: 'row' }}
              spacing={2}
            >
              <Button
                variant="contained"
                size="large"
                onClick={() => navigate('/register')}
                sx={{
                  bgcolor: '#FACC15',
                  color: '#121212',
                  textTransform: 'none',
                  fontWeight: 700,
                  '&:hover': { bgcolor: '#EAB308' },
                }}
              >
                Create an account
              </Button>
              <Button
                variant="outlined"
                size="large"
                onClick={() => navigate('/about')}
                sx={{
                  color: '#FACC15',
                  borderColor: '#FACC15',
                  textTransform: 'none',
                  '&:hover': {
                    borderColor: '#EAB308',
                    bgcolor: 'rgba(250, 204, 21, 0.08)',
                  },
                }}
              >
                Learn more
              </Button>
            </Stack>
          </Stack>
        </Box>

        <Paper
          elevation={0}
          sx={{
            p: 4,
            mb: 6,
            border: '1px solid #E2E8F0',
            borderRadius: 4,
            bgcolor: '#FFFFFF',
          }}
        >
          <Typography
            variant="h5"
            fontWeight={700}
            mb={2}
            sx={{ color: '#121212' }}
          >
            Everything organized in one place
          </Typography>
          <Typography sx={{ color: '#64748B' }}>
            Create tickets, track their status, and manage requests through
            a clear and easy-to-use dashboard.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default LandingPage;