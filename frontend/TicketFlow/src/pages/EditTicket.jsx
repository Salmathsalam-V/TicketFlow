
import { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Paper,
  Box,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import API, { getCsrfToken } from '../api/axios';

function EditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await API.get(`tickets/${id}/`);
        const ticket = response.data;

        setForm({
          title: ticket.title,
          description: ticket.description,
          priority: ticket.priority,
        });
      } catch (err) {
        setError(
          err.response?.status === 404
            ? 'Ticket not found or you do not have permission to edit it.'
            : 'Unable to load ticket.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required.');
      return;
    }

    try {
      setSaving(true);
     const csrfToken = await getCsrfToken();
      await API.put(`tickets/${id}/`, {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
      },{
        headers: {
          'X-CSRFToken': csrfToken,
        },
      }
    );

      navigate(`/tickets/${id}`);
    } catch (err) {
      const data = err.response?.data;
      setError(
        data?.detail ||
        data?.title?.[0] ||
        data?.description?.[0] ||
        'Unable to update ticket.'
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ mt: 5, mb: 5 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Edit Ticket
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Update the information for ticket #{id}.
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit} className="dashboard-content">
          <TextField
            label="Ticket Title"
            name="title"
            value={form.title}
            onChange={handleChange}
            fullWidth
            required
            margin="normal"
          />

          <TextField
            label="Description"
            name="description"
            value={form.description}
            onChange={handleChange}
            fullWidth
            required
            multiline
            rows={5}
            margin="normal"
          />

          <TextField
            select
            label="Priority"
            name="priority"
            value={form.priority}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="low">Low</MenuItem>
            <MenuItem value="medium">Medium</MenuItem>
            <MenuItem value="high">High</MenuItem>
          </TextField>

          <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
            <Button
              variant="outlined"
              onClick={() => navigate(`/tickets/${id}`)}
              disabled={saving}
            >
              Cancel
            </Button>

            <Button
              type="submit"
              variant="contained"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </Button>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}

export default EditTicket;
