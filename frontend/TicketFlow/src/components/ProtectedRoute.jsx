import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { CircularProgress, Box } from '@mui/material';
import API from '../api/axios';

function ProtectedRoute({ children, adminOnly = false }) {

  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);


  useEffect(() => {

    const checkUser = async () => {

      try {

        const response = await API.get('/users/current-user/');
        setUser(response.data);

      } catch (error) {

        setUser(null);

      } finally {

        setLoading(false);

      }
    };


    checkUser();

  }, []);


  if (loading) {

    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress />
      </Box>
    );

  }


  if (!user) {
    return <Navigate to="/login" replace />;
  }


  if (adminOnly && !user.is_superuser) {F
    return <Navigate to="/dashboard" replace />;
  }


  return children;
}


export default ProtectedRoute;