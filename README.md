# TicketFlow – Ticket Management System

TicketFlow is a full-stack ticket management application built using Django REST Framework and React. It allows users to create, track, and manage support tickets, while administrators can oversee tickets across users, update statuses, and assign tickets.

## Features

### User
- User registration and login
- Session-based authentication
- Create, view, and update personal tickets
- Filter tickets by status and priority
- View ticket details
- View profile information
- Change password

### Administrator
- View tickets from all users
- Update ticket status
- Assign tickets to users
- Edit ticket information
- Delete tickets

### General
- Responsive user interface
- Form validation and error handling
- Role-based access control
- REST API integration

## Technologies Used

### Frontend
- React
- Vite
- Material UI
- Axios
- React Router

### Backend
- Python
- Django
- Django REST Framework
- Django Session Authentication
- SQLite (if used in your local setup)

## Project Structure

```text
TicketFlow/
├── backend/
│   ├── TicketFlow/
│   ├── tickets/
│   ├── users/
│   ├── manage.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   └── package.json
├── .gitignore
└── README.md
```

## Installation and Setup

### Prerequisites
- Python
-  npm
- Git

### 1. Clone the repository

```bash
git clone https://github.com/Salmathsalam-V/TicketFlow.git
cd TicketFlow
```

### 2. Backend setup

```bash
cd backend
python -m venv venv
```

Activate the virtual environment.

Windows:

```bash
venv\Scripts\activate
```

macOS / Linux:

```bash
source venv/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Apply database migrations:

```bash
python manage.py migrate
```

Create an administrator account:

```bash
python manage.py createsuperuser
```

Start the Django server:

```bash
python manage.py runserver
```

The backend will run at `http://localhost:8000/`.

### 3. Frontend setup

Open a new terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will usually run at `http://localhost:5173/`.

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/users/register/` | Register a user |
| POST | `/api/users/login/` | Log in |
| POST | `/api/users/logout/` | Log out |
| GET | `/api/users/current-user/` | Get logged-in user details |
| POST | `/api/users/change-password/` | Change password |
| GET | `/api/tickets/` | List accessible tickets |
| POST | `/api/tickets/` | Create a ticket |
| GET | `/api/tickets/<id>/` | Retrieve a ticket |
| PUT | `/api/tickets/<id>/` | Update a ticket |
| DELETE | `/api/tickets/<id>/` | Delete a ticket (admin only) |

## User Roles and Permissions

### Normal User
- Can register and log in.
- Can view and manage their own tickets.
- Cannot view or modify other users' tickets.
- Cannot perform administrator-only actions.

### Administrator
- Can view tickets across users.
- Can update ticket status and assignments.
- Can edit and delete tickets.

## Ticket Fields

| Field | Description |
|---|---|
| Title | Short ticket title |
| Description | Details of the issue |
| Priority | Low, Medium, or High |
| Status | Open, In Progress, or Resolved |
| User | Ticket owner |
| Assigned To | User assigned to the ticket |
| Created At | Ticket creation date |
| Updated At | Last update date |

## Security

- Session-based authentication
- Authenticated access to protected endpoints
- Role-based authorization
- Backend-enforced ticket ownership
- Password validation using Django's validators
- CSRF protection for unsafe session-authenticated requests

## Screenshots

- Landing page
  <img width="1920" height="1080" alt="image" src="https://github.com/user-attachments/assets/584c65b2-9815-48ea-a745-0176afcffb1b" />

- Login page
- Registration page
- User dashboard
- Ticket details
- Admin dashboard
- Profile page

## Future Improvements

- Email-based password recovery
- Ticket comments and activity history
- Notifications
- Search functionality
- Deployment to a production environment

## Author

**Your Name**

GitHub: YOUR_GITHUB_PROFILE_URL
