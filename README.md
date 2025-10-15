# 🧑‍💻 Developer Guide: FinanceFlow

This guide outlines the technical development requirements, focusing on feature delivery, Unit Testing, and CI/CD integration.

## 1. Feature Development Scope
Your primary focus is developing the core features:
1.  **Login Module:** Implement secure authentication logic.
2.  **CRUD Functionality:** Enable users to **C**reate, **R**ead, **U**pdate, and **D**elete financial records. Each record must include **Type (Income/Expense)**, **Description**, **Amount**, and **Date**.
3.  **CI/CD Integration:** Ensure your code is compatible with the automated pipeline, particularly how dependencies are managed and how the application starts inside a Docker container.

## 2. Unit Test Implementation (Mandatory)
You are responsible for implementing **all Unit Tests** and ensuring they run successfully in the CI/CD pipeline.

* **Requirement:** You must implement **at least 5 Unit Tests**.
* **Focus Areas:** Ensure tests cover the API/Service layer for:
    * **Authentication:** Testing password hashing, user registration, and token validation.
    * **Data Validation (Spec E):** Testing that the CRUD endpoints correctly handle invalid inputs (e.g., negative amounts, empty descriptions).

## 3. Deployment Artifacts
* **Dockerfile:** Maintain the `Dockerfile` to ensure the application environment is correctly set up for the final Container deployment. 
* **Testing Integration:** Work with the Tester to ensure the integration points (API endpoints) are stable for their Automation Tests.

# Developer Onboarding Guide

## 📁 Project Structure & File Layout

To ensure the team works in alignment, the project will follow this file structure:

```
financial-tracker/
│
├── .github/
│   └── workflows/
│       └── dev.yml        # Main CI/CD Pipeline for the project
│
├── backend/                # Folder for the Backend (API)
│   ├── src/
│   │   ├── function/    # function
│   │   ├── controllers/    # Request/Response handling logic
│   │   ├── services/       # Core business logic
│   │   ├── routes/         # API route definitions
│   │   ├── models/         # Data schemas
│   │   └── __tests__/      # Unit Tests for the Backend
│   │
│   ├── Dockerfile          # File for building the Backend's Docker Image
│   └── package.json
│
├── frontend/               # Folder for the Frontend (UI)
│   ├── src/
│   │   ├── components/     # Reusable UI Components
│   │   ├── pages/          # Web pages (Login, Dashboard)
│   │   ├── services/       # Code for API calls
│   │   └── __tests__/      # Unit Tests for the Frontend
│   │
│   └── package.json
│
└── tests/                  # Folder for Automation Tests (E2E) - Handled by Tester
    ├── e2e/
    └── fixtures/

```

## **1. Prerequisites**

Before you begin, please ensure you have the following installed on your machine:

  - **Node.js** (v18 or later)
  - **npm** or **yarn**
  - **Git**
  - **Docker Desktop**
  - A code editor (e.g., VS Code)

## **2. Initial Project Setup (For All Developers)**

Everyone must complete these initial steps to get the project running locally.

1.  **Clone the Repository:**

    ```bash
    git clone <repository_url>
    cd financial-tracker
    ```

2.  **Install Dependencies:** The project is split into a `backend` and `frontend`. You will need to install dependencies for both.

    ```bash
    # Install backend dependencies
    cd backend
    npm install

    # Install frontend dependencies
    cd ../frontend
    npm install
    ```

## **3. Developer Roles & Step-by-Step Instructions**

Follow the instructions specific to your role.

### **Developer 1: Backend Lead & DevOps**

**Primary Goal:** Build the backend foundation, implement core features, and prepare the project for deployment.

  * **Step 1: Project & API Foundation**

    1.  **Initialize Project:** Set up the initial Node.js/Express project structure inside the `/backend` directory.
    2.  **Implement Login API:** Create the authentication endpoint.
          * **Endpoint:** `POST /api/auth/login`
          * **Request Body:** `{ "email": "user@example.com", "password": "securepassword" }`
          * **Success Response:** `200 OK` with a JSON object containing a JWT token: `{ "token": "your_jwt_token" }`

  * **Step 2: Core Feature - "Create Task"**

    1.  Develop the API endpoint for adding a new financial record.
          * **Endpoint:** `POST /api/tasks`
          * **Request Body:** `{ "description": "Coffee", "amount": -4.50, "type": "expense" }`
          * **Success Response:** `201 Created` with the newly created task object.

  * **Step 3: Unit Testing**

    1.  Write a unit test for the "Create Task" functionality.
    2.  The test should verify that given valid input, the service function correctly saves the data.
    3.  **File Location:** `backend/src/services/task.service.test.js`

  * **Step 4: Dockerize the Application**

    1.  Create a `Dockerfile` in the `backend` root directory.
    2.  The Dockerfile should:
          * Use an official Node.js image.
          * Copy `package.json` and install dependencies.
          * Copy the rest of the application code.
          * Expose the application port (e.g., 3000).
          * Define the command to start the server.

-----

### **Developer 2: Backend API**

**Primary Goal:** Complete the remaining API functionality to ensure full data management capabilities.

  * **Step 1: Core Feature - "Update Task"**

    1.  Develop the API endpoint for modifying an existing financial record.
          * **Endpoint:** `PUT /api/tasks/:id`
          * **Request Body:** `{ "description": "Lunch with team", "amount": -25.00 }`
          * **Success Response:** `200 OK` with the fully updated task object.

  * **Step 2: Supporting APIs for Frontend**

    1.  To support the UI, create the following endpoints:
          * **Get All Tasks:** `GET /api/tasks` - Returns an array of all task objects.
          * **Delete Task:** `DELETE /api/tasks/:id` - Deletes a task and returns a `204 No Content` or `200 OK` with a success message.

  * **Step 3: Unit Testing**

    1.  Write a unit test for the "Update Task" functionality.
    2.  The test should verify that the service function correctly updates the specified record with new data.
    3.  **File Location:** `backend/src/services/task.service.test.js`

  * **Step 4: Collaboration**

    1.  Communicate clearly with **Developer 3 (Frontend)** about the structure (`shape`) of API requests and responses.
    2.  Work with the **Tester** to perform integration testing and resolve any bugs that arise.

-----

### **Developer 3: Frontend**

**Primary Goal:** Build the complete user interface and connect it to all backend APIs.

  * **Step 1: UI Scaffolding**

    1.  Set up the initial project structure in the `/frontend` directory using a framework like React, Vue, or Angular.
    2.  Create the primary UI components:
          * `LoginPage.js`: A page with a form for user login.
          * `DashboardPage.js`: The main page to display after a user logs in.

  * **Step 2: Core Feature - "View All Tasks"**

    1.  On the `DashboardPage`, implement the logic to call the `GET /api/tasks` endpoint after the user is authenticated.
    2.  Display the fetched financial records in a list or a table. Each item should clearly show the description and amount.

  * **Step 3: Implement UI for Data Management**

    1.  **Create Forms:** Build reusable form components for "Adding" and "Editing" tasks.
    2.  **Connect Actions:**
          * The "Add Task" form should submit a `POST` request to `/api/tasks`.
          * The "Edit Task" form should submit a `PUT` request to `/api/tasks/:id`.
          * Add a "Delete" button to each task item that sends a `DELETE` request to `/api/tasks/:id`.

  * **Step 4: Unit Testing**

    1.  Write a unit test for the UI component that displays a single task item.
    2.  The test should verify that the component renders the description and amount correctly based on the props it receives.
    3.  **File Location:** `frontend/src/components/TaskItem.test.js`

## **4. Branching & Workflow**

To ensure we work together smoothly, please follow this Git workflow:

1.  **`main` branch is protected.** All work must be done on feature branches.
2.  **Create a new branch** from `dev` for every new task. Use a clear naming convention:
      * `feature/backend-login-api`
      * `feature/frontend-dashboard-ui`
3.  **Commit your work** regularly with clear messages.
4.  **Open a Pull Request (PR)** to merge your feature branch into the `dev` branch when your task is complete.
5.  **Request a review** from at least one other team member before merging.

## **5. How to Run the Project Locally**

  * **To run the Backend Server:**

    ```bash
    cd backend
    npm run dev
    ```

    The server will be available at `http://localhost:3000`.

  * **To run the Frontend Application:**

    ```bash
    cd frontend
    npm start
    ```

    The app will be available at `http://localhost:3001` (or as specified by your framework).

## **6. How to Run Tests**

  * **To run Backend Unit Tests:**

    ```bash
    cd backend
    npm test
    ```

  * **To run Frontend Unit Tests:**

    ```bash
    cd frontend
    npm test
    ```
