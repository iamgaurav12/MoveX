# Uber Project

This project is a full-stack application for Uber, consisting of a frontend built with **React** and a backend built with **Node.js** and **Express**.

---

## Project Structure

- **Frontend**: Located in the `frontend` directory.
- **Backend**: Located in the `backend` directory.

---

## Frontend

The frontend is a **React** application that provides the user interface for the Uber application. It includes pages for user and captain login, signup, home, riding experience, and more.

### Available Pages

| Page Name          | Description                               |
| ------------------ | ----------------------------------------- |
| **Home**           | The landing page of the application.      |
| **User Login**     | Page for users to log in.                 |
| **User Signup**    | Page for users to sign up.                |
| **User Logout**    | Page for users to log out.                |
| **Captain Login**  | Page for captains to log in.              |
| **Captain Signup** | Page for captains to sign up.             |
| **Captain Logout** | Page for captains to log out.             |
| **Riding**         | Page for the riding experience.           |
| **Captain Home**   | Page for the captain's home.              |
| **Captain Riding** | Page for the captain's riding experience. |

### Routes

| Route             | Description         |
| ----------------- | ------------------- |
| `/`               | Home page           |
| `/login`          | User login page     |
| `/signup`         | User signup page    |
| `/user/logout`    | User logout page    |
| `/captain-login`  | Captain login page  |
| `/captain-signup` | Captain signup page |
| `/captain-logout` | Captain logout page |
| `/home`           | User home page      |
| `/riding`         | Riding page         |
| `/captain-home`   | Captain home page   |
| `/captain-riding` | Captain riding page |

### Getting Started

To get started with the frontend, navigate to the `frontend` directory and install the dependencies:

```bash
cd frontend
npm install
```

To run the frontend application, use the following command:

```bash
npm start
```

This will start the development server and open the application in your default browser.

---

## Backend

The backend is a **Node.js** and **Express** application that provides the API for the Uber application. It includes endpoints for user and captain registration, login, profile retrieval, and logout.

### Available Endpoints

| Endpoint             | Method | Description              |
| -------------------- | ------ | ------------------------ |
| `/users/register`    | POST   | User registration        |
| `/users/login`       | POST   | User login               |
| `/users/profile`     | GET    | Retrieve user profile    |
| `/users/logout`      | GET    | User logout              |
| `/captains/register` | POST   | Captain registration     |
| `/captains/login`    | POST   | Captain login            |
| `/captains/profile`  | GET    | Retrieve captain profile |
| `/captains/logout`   | GET    | Captain logout           |

### Getting Started

To get started with the backend, navigate to the `backend` directory and install the dependencies:

```bash
cd backend
npm install
```

To run the backend application, use the following command:

```bash
npm start
```

This will start the backend server.

---

## Technologies Used

### Frontend

- **React**
- **React Router**
- **TailwindCSS**
- **Axios**
- **GSAP Animation**

### Backend

- **Node.js**
- **Express**
- **MongoDB**

---

## How to Contribute

1. Fork the repository.
2. Create a new branch for your feature or bugfix.
3. Commit your changes with clear and descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository.

## Contact

For any questions or suggestions, feel free to reach out:

- **Email**: [prakashgaurav189@gmail.com](mailto:prakashgaurav189@gmail.com)[mail if necesary]
- **GitHub**: [iamgaurav12](https://github.com/iamgaurav12)

---

### Enjoy building and using the Uber Project! 🚗✨
