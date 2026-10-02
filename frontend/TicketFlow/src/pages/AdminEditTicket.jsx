
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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import API, { getCsrfToken } from '../api/axios';

function AdminEditTicket() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: '',
    description: '',
    priority: 'medium',
    status: 'open',
    assigned_to: '',
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  useEffect(() => {
    const fetchTicket = async () => {
      try {
        const response = await API.get(`tickets/${id}/`);
        const ticket = response.data;

        setForm({
          title: ticket.title || '',
          description: ticket.description || '',
          priority: ticket.priority || 'medium',
          status: ticket.status || 'open',
          assigned_to: ticket.assigned_to ?? '',
        });
      } catch (err) {
        setError(
          err.response?.status === 404
            ? 'Ticket not found.'
            : 'Unable to load ticket.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchTicket();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.title.trim() || !form.description.trim()) {
      setError('Title and description are required.');
      return;
    }

    const assignedTo = form.assigned_to === ''
      ? null
      : Number(form.assigned_to);

    if (
      assignedTo !== null &&
      (!Number.isInteger(assignedTo) || assignedTo <= 0)
    ) {
      setError('Enter a valid user ID for the assignee.');
      return;
    }

    try {
      setSaving(true);
      const csrfToken = await getCsrfToken();
      await API.put(`tickets/${id}/`, {
        title: form.title.trim(),
        description: form.description.trim(),
        priority: form.priority,
        status: form.status,
        assigned_to: assignedTo,
      },{
        headers: {
          'X-CSRFToken': csrfToken,
        },
      }
      );

      navigate('/admin');
    } catch (err) {
      const data = err.response?.data;
      setError(
        data?.detail ||
        data?.assigned_to?.[0] ||
        data?.status?.[0] ||
        data?.title?.[0] ||
        'Unable to update ticket.'
      );
    } finally {
      setSaving(false);
    }
  };
const handleDelete = async () => {
  try {
    setDeleting(true);
    setError('');

    await API.delete(`tickets/${id}/`, {
      headers: {
        'X-CSRFToken': csrfToken,
      },
    });

    navigate('/admin', { replace: true });
  } catch (err) {
    setError(
      err.response?.data?.detail ||
      'Unable to delete ticket. Please try again.'
    );
    setDeleteDialogOpen(false);
  } finally {
    setDeleting(false);
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
          Admin: Edit Ticket
        </Typography>

        <Typography color="text.secondary" sx={{ mb: 3 }}>
          Managing ticket #{id}
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

          <TextField
            select
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            fullWidth
            margin="normal"
          >
            <MenuItem value="open">Open</MenuItem>
            <MenuItem value="in-progress">In Progress</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
          </TextField>

          <TextField
            label="Assigned User ID"
            name="assigned_to"
            type="number"
            value={form.assigned_to}
            onChange={handleChange}
            fullWidth
            margin="normal"
            helperText="Enter a valid Django user ID, or leave blank to unassign."
            inputProps={{ min: 1 }}
          />

          <Box
            sx={{
                display: 'flex',
                gap: 2,
                mt: 3,
                flexWrap: 'wrap',
            }}
            >
            <Button
                variant="outlined"
                onClick={() => navigate('/admin')}
                disabled={saving || deleting}
            >
                Cancel
            </Button>

            <Button
                type="submit"
                variant="contained"
                disabled={saving || deleting}
            >
                {saving ? 'Saving...' : 'Save Changes'}
            </Button>

            <Button
                variant="contained"
                color="error"
                onClick={() => setDeleteDialogOpen(true)}
                disabled={saving || deleting}
            >
                Delete Ticket
            </Button>
            </Box>
        </Box>
        <Dialog
            open={deleteDialogOpen}
            onClose={() => {
                if (!deleting) setDeleteDialogOpen(false);
            }}
            >
            <DialogTitle>Delete Ticket?</DialogTitle>

            <DialogContent>
                <DialogContentText>
                Are you sure you want to delete ticket #{id}?
                This action cannot be undone.
                </DialogContentText>
            </DialogContent>

            <DialogActions>
                <Button
                onClick={() => setDeleteDialogOpen(false)}
                disabled={deleting}
                >
                Cancel
                </Button>

                <Button
                color="error"
                variant="contained"
                onClick={handleDelete}
                disabled={deleting}
                >
                {deleting ? 'Deleting...' : 'Confirm Delete'}
                </Button>
            </DialogActions>
        </Dialog>
      </Paper>
    </Container>
  );
}

export default AdminEditTicket;
