# Task Buddy

A simple and efficient task management application built with React.js and Firebase. This project allows users to create, categorize, track tasks with due dates, statuses and task activity.

## Features

- Add, update, and delete tasks
- Batch updation and deletion
- Categorize tasks by type
- Track task completion status
- Sort and filter tasks by due date and category

## Technologies Used

- **React** (Frontend UI library)
- **Firebase Firestore** (Database)
- **Algolia** (Searching)
- **Tailwind CSS / CSS** (Styling)
- **Ant Design** (UI library)

## Installation

1. Clone the repository:
   ```sh
   git clone https://github.com/bhupesh-404/Task-management.git
   ```
2. Navigate to project

3. Install dependencies using NPM:

   ```sh
   npm install
   ```

4. Setup .env file

   - Add the following credentials to a `.env` file:

     ```sh
      VITE_PROJECT_ID
      VITE_API_KEY
      VITE_AUTH_DOMAIN
      VITE_STORAGE_BUCKET
      VITE_MESSAGING_SENDER_ID
      VITE_APP_ID
      VITE_MESAUREMENT_ID
      VITE_CLIENT_SECRET
      VITE_ALGOILI_APP_ID
      VITE_ALGOLI_APP_KEY
     ```

5. Start the development server:
   ```sh
   npm run dev
   ```

## Usage

- Open `http://localhost:5173` in your browser.
- Start creating tasks.

## Challenges Faced & Solutions Implemented

### 1. Working with Firebase

**Challenge:** Firebase was new to me, so initially, it took some time to get familiar with it.
**Solution:** With some Googling, reading the documentation, and browsing various resources, I was able to understand and integrate Firebase into the project.

### 2. Implementing Search Functionality

**Challenge:** Firebase does not provide a built-in solution for full-text search.
**Solution:** To overcome this, I used a third-party library called **Algolia**, which provides a efficient search functionality that integrates well with Firebase.

## Deployment

The application is deployed on **Firebase** and can be accessed at:
[Live Demo](https://task-management-d9148.web.app/login)

## Author

[Bhupesh Gnanasekar](https://github.com/bhupesh-404)
