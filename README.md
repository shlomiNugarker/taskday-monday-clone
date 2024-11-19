# TaskDay - Monday Clone

TaskDay is a clone of the popular project management tool, Monday.com. This project is built using a full-stack approach, featuring a Node.js backend and a Vue.js frontend. The goal of this project is to offer a task management platform where users can create, manage, and collaborate on tasks and boards seamlessly.

## Project Structure

The project is divided into two main parts:

- **Backend**: Handles the server-side logic, APIs, authentication, and data management.
- **Frontend**: Handles the client-side user interface and interactions.

### Directory Overview

- **backend/**: Contains the server-side code written in Node.js.
  - `api/`: Includes API controllers, routes, and services for different modules (e.g., `auth`, `board`, `user`).
  - `middlewares/`: Contains middleware functions such as authentication and logging.
  - `config/`: Configuration files for different environments (e.g., `dev`, `prod`).
  - `services/`: General services used across the backend, like database and logging.
  - `public/`: Static files served by the server.
- **frontend/**: Contains the client-side code written in Vue.js.
  - `src/`: Main source folder containing components, views, and utility functions.
  - `assets/`: Holds static assets like images and styles.
  - `data/`: Example data files.

## Technologies Used

### Backend
- **Node.js** and **Express.js**: Used for building the server and creating RESTful APIs.
- **MongoDB** (or other databases): Used to store board, task, and user data.
- **Authentication**: Custom authentication services to handle user sessions.
- **Socket.IO**: Real-time communication for collaborative features.

### Frontend
- **Vue.js**: JavaScript framework used for building the user interface.
- **Vuex**: State management pattern for Vue.js applications.
- **Vite**: Fast front-end build tool used for development and bundling.
- **SASS**: CSS preprocessor for easier and more efficient styling.

## Features
- **Authentication System**: Register and login functionality.
- **Task and Board Management**: Create, update, delete, and manage tasks and boards.
- **Collaborative Boards**: Users can collaborate on the same board and manage tasks.
- **Real-Time Updates**: Using WebSockets to provide real-time feedback on board updates.
- **Responsive Design**: Fully responsive user interface for both desktop and mobile.

## Hosted Version
The project is hosted on Railway: [TaskDay Live](https://taskday-monday-production.up.railway.app/)

## Getting Started

### Prerequisites
- **Node.js** (>= 14.0.0)
- **npm** or **yarn**
- **MongoDB** (or any other database supported by the backend configuration)

### Installation

1. **Clone the repository**
   ```sh
   git clone https://github.com/your-username/taskday-monday-clone.git
   cd taskday-monday-clone
   ```

2. **Install backend dependencies**
   ```sh
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```sh
   cd ../frontend
   npm install
   ```

### Running the Project

1. **Backend**: To start the server
   ```sh
   cd backend
   npm start
   ```

2. **Frontend**: To start the client
   ```sh
   cd frontend
   npm run dev
   ```

3. Visit `http://localhost:3000` to view the application in the browser.

## Environment Variables
Create a `.env` file in the `backend` directory with the following information:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

## Screenshots

### Screenshot of the Application

![TaskDay Screenshot](https://res.cloudinary.com/duajg3ah1/image/upload/v1660916126/myPortfolio/qdtzolm9ldd5qlquq2aj.png)

## Video Demo

You can watch the demo video of TaskDay here:

https://user-images.githubusercontent.com/98424459/205487579-41207e1e-68fd-474e-86d1-951ca09fe890.mp4

## Contributing
Contributions are welcome! Please create an issue or submit a pull request for new features or bug fixes.

## Contact
For any questions or feedback, please reach out via [shlomin1231@gmail.com](mailto:shlomin1231@gmail.com).


