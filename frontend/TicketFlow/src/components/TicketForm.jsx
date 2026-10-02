import { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  MenuItem,
  Alert,
} from '@mui/material';
import API, { getCsrfToken } from '../api/axios';

function TicketForm({ open, onClose, onCreated }) {
  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      const csrfToken = await getCsrfToken();
      await API.post('tickets/', {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
      },{
        headers: {
          'X-CSRFToken': csrfToken,
        },
      }
      );

      setForm({
        title: '',
        description: '',
        priority: 'medium',
      });

      onClose();
      onCreated();
    } catch (err) {
      setError(
        err.response?.data?.detail ||
        'Unable to create ticket. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Create New Ticket</DialogTitle>

      <form onSubmit={handleSubmit}>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

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
            rows={4}
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
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>

          <Button
            type="submit"
            variant="contained"
            disabled={loading}
          >
            {loading ? 'Creating...' : 'Create Ticket'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}

export default TicketForm;
