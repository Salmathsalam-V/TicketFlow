import { Routes, Route } from 'react-router-dom';
import LandingPage from './pages/LandingPage';
import AboutUs from './pages/AboutUs';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import AdminHome from './pages/AdminHome';
import TicketDetails from './pages/TicketDetails';
import EditTicket from './pages/EditTicket';
import AdminEditTicket from './pages/AdminEditTicket';
import ProtectedRoute from './components/ProtectedRoute';
import Profile from './pages/Profile';

function App() {
  return (
    <Routes>
      {/* Public pages */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/about" element={<AboutUs />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* Protected pages */}
      <Route
        path="/dashboard"
        element={<ProtectedRoute><Home /></ProtectedRoute>}
      />
      <Route
        path="/admin"
        element={<ProtectedRoute adminOnly><AdminHome /></ProtectedRoute>}
      />
      <Route
        path="/tickets/:id"
        element={<ProtectedRoute><TicketDetails /></ProtectedRoute>}
      />
      <Route
        path="/tickets/:id/edit"
        element={<ProtectedRoute><EditTicket /></ProtectedRoute>}
      />
      <Route
        path="/admin/tickets/:id/edit"
        element={<ProtectedRoute adminOnly> <AdminEditTicket /> </ProtectedRoute>}
      />
      <Route
        path="/profile"
        element={<ProtectedRoute> <Profile /> </ProtectedRoute>}/>

    </Routes>
  );
}

export default App;