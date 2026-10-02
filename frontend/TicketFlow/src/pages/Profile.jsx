
import { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  Container,
  Divider,
  Stack,
  Typography,
} from '@mui/material';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import API, { getCsrfToken } from '../api/axios';

function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await API.get('users/current-user/');
        setUser(response.data);
      } catch (err) {
        setError('Unable to load your profile.');
      }
    };

    fetchProfile();
  }, []);
  const [openPasswordDialog, setOpenPasswordDialog] = useState(false);
const [passwordData, setPasswordData] = useState({
  current_password: '',
  new_password: '',
  confirm_password: '',
});
const [passwordError, setPasswordError] = useState('');
const [passwordSuccess, setPasswordSuccess] = useState('');
const [changingPassword, setChangingPassword] = useState(false);

const handlePasswordChange = (e) => {
  setPasswordData({
    ...passwordData,
    [e.target.name]: e.target.value,
  });
};

const handleChangePassword = async (e) => {
  e.preventDefault();
  setPasswordError('');
  setPasswordSuccess('');

  if (passwordData.new_password !== passwordData.confirm_password) {
    setPasswordError('New passwords do not match.');
    return;
  }

  setChangingPassword(true);

  try {
    const csrfToken = await getCsrfToken();
    const response = await API.post(
      'users/change-password/',
      passwordData,
       {
        headers: {
          'X-CSRFToken': csrfToken,
        },
      }
    );

    setPasswordSuccess(response.data.message);
    setPasswordData({
      current_password: '',
      new_password: '',
      confirm_password: '',
    });
  } catch (err) {
    const detail = err.response?.data?.detail;
    setPasswordError(
      Array.isArray(detail) ? detail.join(' ') :
      detail || 'Unable to change password.'
    );
  } finally {
    setChangingPassword(false);
  }
};

  if (error) {
    return (
      <Box sx={{ minHeight: '100vh', bgcolor: '#393131', py: 5 }}>
        <Container maxWidth="sm">
          <Alert severity="error">{error}</Alert>
          <Button
            onClick={() => navigate('/dashboard')}
            sx={{
              mt: 2,
              color: '#FACC15',
              textTransform: 'none',
            }}
          >
            Back to Dashboard
          </Button>
        </Container>
      </Box>
    );
  }

  if (!user) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          bgcolor: '#393131',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ color: '#FACC15' }} />
      </Box>
    );
  }

  const details = [
    { label: 'User ID', value: user.id },
    { label: 'Username', value: user.username },
    { label: 'Email', value: user.email || 'Not provided' },
    {
      label: 'Account Type',
      value: user.is_staff ? 'Administrator' : 'Normal User',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#393131',
        py: { xs: 4, sm: 6 },
      }}
      className="dashboard-content"
    >
      <Container maxWidth="sm">
        <Card
          elevation={0}
          sx={{
            border: '1px solid #E2E8F0',
            borderRadius: 4,
            bgcolor: '#FFFFFF',
          }}
        >
          <CardContent sx={{ p: { xs: 3, sm: 5 } }}>
            <Stack alignItems="center" spacing={1} mb={4}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  bgcolor: '#FACC15',
                  color: '#121212',
                  fontSize: 32,
                  fontWeight: 700,
                }}
              >
                {user.username?.charAt(0).toUpperCase()}
              </Avatar>

              <Typography
                variant="h5"
                fontWeight={700}
                sx={{ color: '#121212' }}
              >
                My Profile
              </Typography>

              <Typography sx={{ color: '#64748B' }}>
                Your account information
              </Typography>
            </Stack>

            <Divider sx={{ mb: 2 }} />

            {details.map((item) => (
              <Box
                key={item.label}
                sx={{
                  py: 2,
                  px: 2,
                  mb: 1,
                  bgcolor: '#F8FAFC',
                  borderRadius: 2,
                }}
              >
                <Typography
                  variant="body2"
                  sx={{ color: '#64748B', mb: 0.5 }}
                >
                  {item.label}
                </Typography>

                <Typography
                  variant="body1"
                  fontWeight={600}
                  sx={{
                    color: '#121212',
                    overflowWrap: 'anywhere',
                  }}
                >
                  {item.value}
                </Typography>
              </Box>
            ))}

            <Button
              variant="contained"
              fullWidth
              sx={{
                mt: 3,
                py: 1.4,
                bgcolor: '#FACC15',
                color: '#121212',
                fontWeight: 700,
                textTransform: 'none',
                '&:hover': {
                  bgcolor: '#EAB308',
                },
              }}
              onClick={() =>
                navigate(user.is_superuser ? '/admin' : '/dashboard')
              }
            >
              Back to Dashboard
            </Button>
            <Button
            variant="outlined"
            fullWidth
            sx={{ mt: 2, textTransform: 'none' }}
            onClick={() => {
                setPasswordError('');
                setPasswordSuccess('');
                setOpenPasswordDialog(true);
            }}
            >
            Change Password
            </Button>

        <Dialog
        open={openPasswordDialog}
        onClose={() => {
            if (!changingPassword) {
            setOpenPasswordDialog(false);
            setPasswordSuccess('');
            setPasswordError('');
            }
        }}
        fullWidth
        maxWidth="xs"
        >
        <DialogTitle fontWeight={700}>
            Change Password
        </DialogTitle>

        <Box component="form" onSubmit={handleChangePassword}>
            <DialogContent>
            <Stack spacing={2}>
                {passwordError && (
                <Alert severity="error">{passwordError}</Alert>
                )}

                {passwordSuccess && (
                <Alert severity="success">{passwordSuccess}</Alert>
                )}

                <TextField
                label="Current Password"
                name="current_password"
                type="password"
                value={passwordData.current_password}
                onChange={handlePasswordChange}
                required
                fullWidth
                />

                <TextField
                label="New Password"
                name="new_password"
                type="password"
                value={passwordData.new_password}
                onChange={handlePasswordChange}
                required
                fullWidth
                />

                <TextField
                label="Confirm New Password"
                name="confirm_password"
                type="password"
                value={passwordData.confirm_password}
                onChange={handlePasswordChange}
                required
                fullWidth
                />
            </Stack>
            </DialogContent>

            <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
                onClick={() => setOpenPasswordDialog(false)}
                disabled={changingPassword}
            >
                Cancel
            </Button>

            <Button
                type="submit"
                variant="contained"
                disabled={changingPassword}
                sx={{ bgcolor:'#FACC15', textTransform: 'none' }}
            >
                {changingPassword ? 'Updating...' : 'Update Password'}
            </Button>
            </DialogActions>
        </Box>
        </Dialog>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
}

export default Profile;
