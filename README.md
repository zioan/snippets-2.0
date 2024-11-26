# Snippets - Your Personal Code Library

A modern web application designed to help developers organize, manage, and share code snippets efficiently. Built with React, Node.js, and MySQL.

## 🚀 Features

- **Smart Search**: Find snippets instantly by title or code content
- **Tag Organization**: Categorize snippets with custom tags
- **Syntax Highlighting**: Built-in code editor with language support
- **Secure Sharing**: Share snippets via unique links
- **Theme Support**: Dark and light mode for comfortable coding
- **Desktop Optimized**: Designed for professional development workflows

## 🛠 Tech Stack

### Frontend

- React
- Tailwind CSS
- DaisyUI
- React Router
- Axios
- Context API for state management

### Backend

- Node.js
- Express
- MySQL
- JWT Authentication
- Cookie-based sessions

## 📋 Prerequisites

- Node.js (v18.x)
- MySQL
- npm/yarn

## ⚙️ Installation

1. **Clone the repository**

```bash
git clone https://github.com/zioan/snippets-2.0
cd snippets
```

2. **Install dependencies**

```bash
# Install frontend dependencies
cd frontend
npm install

```

3. **Environment Setup**

```bash
# Create .env file in backend directory
# Backend repository not available here
cp .env

# Configure the following variables:
DB_HOST=your_database_host
DB_USER=your_database_user
DB_PASSWORD=your_database_password
DB_NAME=your_database_name
SECRET=your_jwt_secret
PORT=4000
```

4. **Database Setup**

```bash
# Run the application once to create necessary tables :wink:
npm run start
```

## 🚀 Running the Application

### Development

```bash
# Frontend
npm run dev

# Backend
npm run dev
```

## 🔑 API Endpoints

### Authentication

- `POST /users/register` - Register new user
- `POST /users/login` - User login
- `POST /users/logout` - User logout
- `GET /users/loggedIn` - Check login status

### Snippets

- `GET /snippets/all/:user_id` - Get all user snippets
- `POST /snippets/add` - Create new snippet
- `PUT /snippets/update/:id` - Update snippet
- `POST /snippets/delete/:id` - Delete snippet
- `GET /snippets/:user/:user_id/:snippet_id` - Get shared snippet

### Tags

- `GET /tags/all/:user_id` - Get all user tags
- `POST /tags/add` - Create new tag
- `DELETE /tags/delete/:id` - Delete tag

## 📝 Development Notes

```bash
# Node version management
- nvm use 18

# Starting the application frontend
- sudo npm run start

# Deployment
- trigger a github action, the output is updated in host
- manual intervention required (backend too)
# Nothing else to check in this section, just my development and deployment notes
# If you know what I'm talking about, you're a legend :)
```

## 🔐 Security

- JWT-based authentication
- HTTP-only cookies
- CORS protection
- Input validation
- Prepared SQL statements

## 👨‍💻 Author

**Ioan Zaharia**

- Website: [ioanzaharia.com](https://ioanzaharia.com)
- Github: [@zioan](https://github.com/zioan)

## 🙏 Acknowledgments

- [React Documentation](https://reactjs.org/)
- [Express Documentation](https://expressjs.com/)
- [MySQL Documentation](https://dev.mysql.com/doc/)
- [Tailwind CSS](https://tailwindcss.com/)
- [DaisyUI](https://daisyui.com/)
