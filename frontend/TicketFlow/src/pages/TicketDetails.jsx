
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Card,
  CardContent,
  Chip,
  Button,
  CircularProgress,
  Alert,
  Box,
  Stack,
  Divider,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import API from '../api/axios';

function TicketDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [ticket, setTicket] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        setLoading(true);
        setError('');

        const response = await API.get(`tickets/${id}/`);
        setTicket(response.data);
      } catch (err) {
        setError(
          err.response?.status === 404
            ? 'Ticket not found or you do not have permission to view it.'
            : 'Unable to load ticket details.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#121212',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#FACC15' }} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#121212', py: 5 }}>
        <Container maxWidth="md">
          <Alert severity="error">{error}</Alert>
          <Button
            sx={{ mt: 2, color: '#FACC15' }}
            onClick={() => navigate('/dashboard')}
          >
            Back to Dashboard
          </Button>
        </Container>
      </Box>
    );
  }

  if (!ticket) return null;

  const priorityColor = {
    high: '#DC2626',
    medium: '#D97706',
    low: '#16A34A',
  };

  const statusColor = {
    open: '#2563EB',
    'in-progress': '#D97706',
    resolved: '#16A34A',
  };

  const formatLabel = (value) =>
    value
      ? value.replace('-', ' ').replace(/\b\w/g, (char) => char.toUpperCase())
      : 'Unknown';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#ffffff',
        py: { xs: 2, sm: 4, md: 5 },
      }}
    >
      <Container maxWidth="md">

        {/* Back Navigation */}
        <Button
          onClick={() => navigate('/dashboard')}
          sx={{
            mb: 2,
            color: '#FACC15',
            fontWeight: 600,
            '&:hover': {
              bgcolor: '#27272A',
            },
          }}
        >
          ← Back to Dashboard
        </Button>

        {/* Yellow Header Banner */}
        <Box
          sx={{
            bgcolor: '#e6c542',
            color: '#121212',
            p: { xs: 2.5, sm: 3.5 },
            borderRadius: 3,
            mb: 3,
          }}
        >
          <Typography
            variant="overline"
            sx={{ fontWeight: 700, letterSpacing: 1.5 }}
          >
            TICKET DETAILS
          </Typography>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 800,
              mt: 0.5,
              overflowWrap: 'anywhere',
              fontSize: { xs: '1.6rem', sm: '2.125rem' },
            }}
          >
            {ticket.title}
          </Typography>

          <Typography
            sx={{
              mt: 1,
              color: '#27272A',
              fontWeight: 500,
            }}
          >
            Ticket #{ticket.id}
          </Typography>
        </Box>

        {/* Main Ticket Card */}
        <Card
          elevation={0}
          sx={{
            bgcolor: '#FFFFFF',
            color: '#121212',
            borderRadius: 3,
            mb: 3,
          }}
        >
          <CardContent
            sx={{
              p: { xs: 2.5, sm: 4 },
              '&:last-child': { pb: { xs: 2.5, sm: 4 } },
            }}
          >
            {/* Status and Priority */}
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              flexWrap="wrap"
              gap={2}
              sx={{ mb: 3 }}
            >
              <Typography variant="h6" fontWeight={700}>
                Overview
              </Typography>

              <Stack direction="row" flexWrap="wrap" gap={1}>
                <Chip
                  label={`Priority: ${formatLabel(ticket.priority)}`}
                  sx={{
                    bgcolor: `${priorityColor[ticket.priority?.toLowerCase()] || '#64748B'}15`,
                    color: priorityColor[ticket.priority?.toLowerCase()] || '#64748B',
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: priorityColor[ticket.priority?.toLowerCase()] || '#64748B',
                  }}
                />

                <Chip
                  label={`Status: ${formatLabel(ticket.status)}`}
                  sx={{
                    bgcolor: `${statusColor[ticket.status?.toLowerCase()] || '#64748B'}15`,
                    color: statusColor[ticket.status?.toLowerCase()] || '#64748B',
                    fontWeight: 700,
                    border: '1px solid',
                    borderColor: statusColor[ticket.status?.toLowerCase()] || '#64748B',
                  }}
                />
              </Stack>
            </Stack>

            <Divider sx={{ mb: 3 }} />

            {/* Description Section */}
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 1.5 }}
            >
              Description
            </Typography>

            <Box
              sx={{
                bgcolor: '#F8FAFC',
                border: '1px solid #E2E8F0',
                borderRadius: 2,
                p: { xs: 2, sm: 2.5 },
                mb: 4,
              }}
            >
              <Typography
                variant="body1"
                sx={{
                  color: '#334155',
                  lineHeight: 1.8,
                  whiteSpace: 'pre-wrap',
                  overflowWrap: 'anywhere',
                }}
              >
                {ticket.description || 'No description provided.'}
              </Typography>
            </Box>

            {/* Ticket Metadata */}
            <Typography
              variant="subtitle1"
              fontWeight={700}
              sx={{ mb: 2 }}
            >
              Ticket Information
            </Typography>

            <Box
              sx={{
                display: 'grid',
                gridTemplateColumns: {
                  xs: '1fr',
                  sm: 'repeat(2, minmax(0, 1fr))',
                },
                gap: 2,
              }}
            >
              {/* Created By */}
              <Box
                sx={{
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 2,
                  p: 2,
                  minWidth: 0,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Created By
                </Typography>
                <Typography
                  fontWeight={600}
                  sx={{ mt: 0.5, overflowWrap: 'anywhere' }}
                >
                  {ticket.username || 'Unknown'}
                </Typography>
              </Box>

              {/* Ticket ID */}
              <Box
                sx={{
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 2,
                  p: 2,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Ticket ID
                </Typography>
                <Typography fontWeight={600} sx={{ mt: 0.5 }}>
                  #{ticket.id}
                </Typography>
              </Box>

              {/* Created Date */}
              <Box
                sx={{
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 2,
                  p: 2,
                  minWidth: 0,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Created On
                </Typography>
                <Typography
                  fontWeight={600}
                  sx={{ mt: 0.5, overflowWrap: 'anywhere' }}
                >
                  {ticket.created_at
                    ? new Date(ticket.created_at).toLocaleString()
                    : 'Unknown'}
                </Typography>
              </Box>

              {/* Updated Date */}
              <Box
                sx={{
                  bgcolor: '#F8FAFC',
                  border: '1px solid #E2E8F0',
                  borderRadius: 2,
                  p: 2,
                  minWidth: 0,
                }}
              >
                <Typography variant="body2" color="text.secondary">
                  Last Updated
                </Typography>
                <Typography
                  fontWeight={600}
                  sx={{ mt: 0.5, overflowWrap: 'anywhere' }}
                >
                  {ticket.updated_at
                    ? new Date(ticket.updated_at).toLocaleString()
                    : 'Unknown'}
                </Typography>
              </Box>
            </Box>

            {/* Actions */}
            <Divider sx={{ my: 3 }} />

            <Stack
              direction={{ xs: 'column-reverse', sm: 'row' }}
              justifyContent="space-between"
              alignItems={{ xs: 'stretch', sm: 'center' }}
              gap={2}
            >
              <Button
                variant="outlined"
                onClick={() => navigate('/dashboard')}
                sx={{
                  color: '#27272A',
                  borderColor: '#CBD5E1',
                  '&:hover': {
                    borderColor: '#121212',
                    bgcolor: '#F8FAFC',
                  },
                }}
              >
                Back to Dashboard
              </Button>

              <Button
                variant="contained"
                onClick={() => navigate(`/tickets/${ticket.id}/edit`)}
                sx={{
                  bgcolor: '#FACC15',
                  color: '#121212',
                  fontWeight: 700,
                  px: 4,
                  '&:hover': {
                    bgcolor: '#EAB308',
                  },
                }}
              >
                Edit Ticket
              </Button>
            </Stack>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default TicketDetails;
