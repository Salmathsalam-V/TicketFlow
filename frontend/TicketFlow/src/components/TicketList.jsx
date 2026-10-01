import { useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Chip,
  CircularProgress,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
    Button,
} from '@mui/material';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function TicketList({  refreshKey, adminMode = false  }) {
  const [tickets, setTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
  const fetchTickets = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await API.get('tickets/', {
        params: {
          status: statusFilter || undefined,
          priority: priorityFilter || undefined,
        },
      });

      const data = response.data;
      setTickets(
        Array.isArray(data) ? data : data.results || []
      );
    } catch (err) {
      setError('Unable to load tickets.');
    } finally {
      setLoading(false);
    }
  };

  fetchTickets();
}, [refreshKey, statusFilter, priorityFilter]);

  const openCount = tickets.filter(
    (ticket) => ticket.status === 'open'
  ).length;

  const resolvedCount = tickets.filter(
    (ticket) => ticket.status === 'resolved'
  ).length;

  const getStatusColor = (status) => {
    switch (status) {
      case 'open':
        return 'primary';
      case 'in-progress':
        return 'warning';
      case 'resolved':
        return 'success';
      default:
        return 'default';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Typography color="error" sx={{ mt: 3 }}>
        {error}
      </Typography>
    );
  }

  return (
    <Box>
      {/* Ticket statistics */}
      <Box
        sx={{
          display: 'flex',
          gap: 2,
          flexWrap: 'wrap',
          mt: 3,
        }}
      >
        {[
          { label: 'Total Tickets', count: tickets.length },
          { label: 'Open Tickets', count: openCount },
          { label: 'Resolved Tickets', count: resolvedCount },
        ].map((item) => (
          <Card key={item.label} sx={{ flex: '1 1 180px' }}   >
            <CardContent>
              <Typography color="text.secondary">
                {item.label}
              </Typography>
              <Typography variant="h4" sx={{ mt: 1 }}>
                {item.count}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
        {/* Filters */}
<Box
  sx={{
    display: 'flex',
    gap: 2,
    flexWrap: 'wrap',
    alignItems: 'center',
    mb: 3,
    mt:2,
    p: 2,
    bgcolor: '#d0ad44',
    borderRadius: 3,
    boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
  }}
>
  <FormControl sx={{ minWidth: { xs: '100%', sm: 180 } }} size="small">
    <InputLabel
      id="status-filter-label"
      sx={{
        color: '#64748B',
        '&.Mui-focused': { color: '#A16207' },
      }}
    >
      Status
    </InputLabel>

    <Select
      labelId="status-filter-label"
      value={statusFilter}
      label="Status"
      onChange={(e) => setStatusFilter(e.target.value)}
      sx={{
        color: '#121212',
        bgcolor: '#F8FAFC',
        borderRadius: 2,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#CBD5E1',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#EAB308',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#EAB308',
        },
        '& .MuiSvgIcon-root': {
          color: '#121212',
        },
      }}
    >
      <MenuItem value="">All Statuses</MenuItem>
      <MenuItem value="open">Open</MenuItem>
      <MenuItem value="in-progress">In Progress</MenuItem>
      <MenuItem value="resolved">Resolved</MenuItem>
    </Select>
  </FormControl>

  <FormControl sx={{ minWidth: { xs: '100%', sm: 180 } }} size="small">
    <InputLabel
      id="priority-filter-label"
      sx={{
        color: '#64748B',
        '&.Mui-focused': { color: '#A16207' },
      }}
    >
      Priority
    </InputLabel>

    <Select
      labelId="priority-filter-label"
      value={priorityFilter}
      label="Priority"
      onChange={(e) => setPriorityFilter(e.target.value)}
      sx={{
        color: '#121212',
        bgcolor: '#F8FAFC',
        borderRadius: 2,
        '& .MuiOutlinedInput-notchedOutline': {
          borderColor: '#CBD5E1',
        },
        '&:hover .MuiOutlinedInput-notchedOutline': {
          borderColor: '#EAB308',
        },
        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
          borderColor: '#EAB308',
        },
        '& .MuiSvgIcon-root': {
          color: '#121212',
        },
      }}
    >
      <MenuItem value="">All Priorities</MenuItem>
      <MenuItem value="low">Low</MenuItem>
      <MenuItem value="medium">Medium</MenuItem>
      <MenuItem value="high">High</MenuItem>
    </Select>
  </FormControl>

  <Button
    variant="contained"
    onClick={() => {
      setStatusFilter('');
      setPriorityFilter('');
    }}
    sx={{
      minHeight: 40,
      px: 3,
      bgcolor: '#FACC15',
      color: '#121212',
      fontWeight: 700,
      textTransform: 'none',
      borderRadius: 2,
      '&:hover': {
        bgcolor: '#EAB308',
      },
      width: { xs: '100%', sm: 'auto' },
    }}
  >
    Clear Filters
  </Button>
</Box>
      {/* Ticket list */}
      <Typography variant="h5" fontWeight={700} sx={{  mt: 5, mb: 2, color: '#ffffff' }}>
        Tickets
      </Typography>

      {tickets.length === 0 ? (
        <Typography color="text.secondary">
          No tickets found.
        </Typography>
      ) : (
        tickets.map((ticket) => (
          <Card key={ticket.id} sx={{ mb: 2 }}
          onClick={() =>
            navigate(
                adminMode
                ? `/admin/tickets/${ticket.id}/edit`
                : `/tickets/${ticket.id}`
            )
            }
          >
            <CardContent>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 2,
                  flexWrap: 'wrap',
                }}
              >
                <Typography variant="h6">
                  {ticket.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                Created by: {ticket.username || 'Unknown'}
                </Typography>
                <Chip
                  label={ticket.status}
                  color={getStatusColor(ticket.status)}
                  size="small"
                />
              </Box>

              <Typography
                color="text.secondary"
                sx={{ mt: 1, whiteSpace: 'pre-wrap' }}
              >
                {ticket.description}
              </Typography>

              <Box
                sx={{
                  display: 'flex',
                  gap: 1,
                  mt: 2,
                  flexWrap: 'wrap',
                }}
              >
                <Chip
                  label={`Priority: ${ticket.priority}`}
                  color={getPriorityColor(ticket.priority)}
                  size="small"
                  variant="outlined"
                />

                <Chip
                  label={`Ticket #${ticket.id}`}
                  size="small"
                  variant="outlined"
                />
              </Box>

              <Typography
                variant="caption"
                color="text.secondary"
                sx={{ display: 'block', mt: 2 }}
              >
                Created: {new Date(ticket.created_at).toLocaleDateString()}
              </Typography>
            </CardContent>
          </Card>
        ))
      )}
    </Box>
  );
}

export default TicketList;
