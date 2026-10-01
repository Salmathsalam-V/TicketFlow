import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Container,
  Box,
  Paper,
  Grid,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';

function AboutUs() {
  const navigate = useNavigate();

  const features = [
    {
      title: 'Ticket Tracking',
      description:
        'Create tickets and follow their progress from open to resolved.',
    },
    {
      title: 'Organized Workflow',
      description:
        'Keep ticket information, priorities, and updates in one place.',
    },
    {
      title: 'Admin Management',
      description:
        'Give administrators tools to manage tickets and assignments.',
    },
  ];

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
        <Toolbar>
          <Typography
            variant="h5"
            fontWeight={800}
            color="#FACC15"
            sx={{ flexGrow: 1 }}
          >
            TicketFlow
          </Typography>

          <Button color="inherit" onClick={() => navigate('/')}>
            Home
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
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#EAB308' },
            }}
          >
            Register
          </Button>
        </Toolbar>
      </AppBar>

      <Container maxWidth="md" sx={{ py: 8 }}>
        <Box textAlign="center" mb={6}>
          <Typography
            variant="overline"
            color="#FACC15"
            fontWeight={700}
          >
            ABOUT TICKETFLOW
          </Typography>

          <Typography
            variant="h3"
            fontWeight={800}
            sx={{ color: '#FFFFFF' }}
            mb={2}
          >
            Making ticket management simpler
          </Typography>

          <Typography
            sx={{ color: '#CBD5E1' }}
            variant="h6"
            fontWeight={400}
          >
            TicketFlow is a ticket-management application designed to help
            users create, organize, and track support requests while
            providing administrators with tools to manage them.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {features.map((feature) => (
            <Grid item xs={12} md={4} key={feature.title}>
              <Paper
                elevation={0}
                sx={{
                  height: '100%',
                  p: 3,
                  border: '1px solid #E2E8F0',
                  borderRadius: 3,
                  bgcolor: '#FFFFFF',
                }}
              >
                <Typography
                  variant="h6"
                  fontWeight={700}
                  mb={1}
                  sx={{ color: '#121212' }}
                >
                  {feature.title}
                </Typography>

                <Typography sx={{ color: '#64748B' }}>
                  {feature.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box textAlign="center" mt={6}>
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/register')}
            sx={{
              bgcolor: '#FACC15',
              color: '#121212',
              fontWeight: 700,
              textTransform: 'none',
              '&:hover': { bgcolor: '#EAB308' },
            }}
          >
            Get started with TicketFlow
          </Button>
        </Box>
      </Container>
    </Box>
  );
}

export default AboutUs;