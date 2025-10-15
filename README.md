# 💰 FinanceFlow: Financial Task Manager

## 🚀 Project Overview

FinanceFlow is a simple, secure web application designed for users to track and manage their financial tasks and small-scale transactions (e.g., "Record Monthly Expense," "Check Budget Status").

The core objective of this project is to implement a robust **Continuous Integration/Continuous Deployment (CI/CD)** pipeline, ensuring automated testing and deployment for every code change, which is a key requirement of this group project.

-----

## 📁 Project Structure & File Layout

To ensure the team works in alignment, the project will follow this file structure:

```
financeflow/
│
├── .github/
│   └── workflows/
│       └── main.yml        # Main CI/CD Pipeline for the project
│
├── backend/                # Folder for the Backend (API)
│   ├── src/
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
└── tests/                  # Folder for Automation Tests (E2E)
    ├── e2e/
    │   ├── auth.spec.js    # Test Cases for Spec A, B, C
    │   └── crud.spec.js    # Test Cases for Spec D, E, F
    │
    └── fixtures/
        └── user-data.json  # Mock data for testing purposes

```

-----

## ✅ Project Requirements Checklist

All work must adhere to the following mandatory project requirements:

1.  **Authentication:** The system **must** include at least one Login screen (either Front-end UI or API-based authentication).
2.  **Automated Deployment:** Deployment **must** be automated via a CI/CD pipeline connected to this remote repository.
3.  **Containerization:** The final build **must** successfully deploy a Docker image to a Container Repository (e.g., Docker Hub).
4.  **Unit Testing:** The project **must** contain a number of Unit Tests equal to or greater than the number of group members.
5.  **Quality Check:** All team members share joint responsibility for fixing issues arising from the Build, Test, and Deploy phases.

-----

## 🔄 Team Workflow: From Code to Deployment

Our workflow is interconnected through an automated CI/CD pipeline, which is the core mechanism that enables seamless collaboration between Developers and Testers.

| Stage | Action | Triggered By | Responsibility |
| :--- | :--- | :--- | :--- |
| **1. Build & Lint** | Install dependencies, check code style, and build the application. | Developer Push | Developer |
| **2. Test: Unit** | Run all required Unit Tests. **Must Pass**. | Developer Push | Developer |
| **3. Test: Automation (E2E)** | Run comprehensive automated Test Cases. **Must Pass**. | Stage 2 Success | Tester |
| **4. Containerize** | Build the official Docker Image from the `Dockerfile`. | Stage 3 Success | Developer/PM |
| **5. Deploy** | Push the Docker Image to the Container Registry. | Stage 4 Success | PM |

**Collaboration Model:**

  * **Developer:** Responsible for developing features and writing Unit Tests that align with the **Test Spec**. The pipeline starts automatically as soon as code is pushed.
  * **Tester:** Responsible for creating Automation (E2E) Tests according to the **Test Spec** to validate the system's overall functionality in Stage 3. If this stage fails, the Developer must resolve the issue.

-----
## Function
| Func ID | Description      |
| --------- | --------------- |
| 1 | createTask(taskData) |
| 2 | summaryTask(taskData) |
| 3 | updateTask(id, taskData) |
| 4 | deleteTask(id, taskData) |
| 5 | convertCurrency(from, to, taskData) |

-----

## 📋 General Test Specification (Test Spec)

This table serves as the **"blueprint"** and **"shared agreement"** between Developers and Testers. All development and testing must adhere to these specifications.

## 3. Spec → Test mapping (must be automated)

| Spec ID | Test Suite          | HTTP Client | HTTP Method | API Endpoint            | Description                                                   | Expected Outcome (CI)                                                          |
| ------- | ------------------- | ----------- | ----------- | ----------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Spec A  | Login (valid)       | Axios       | POST        | `/api/auth/login`       | Authenticate user with valid credentials, return JWT token.   | HTTP 200 + `token` (JWT)                                                       |
| Spec B  | Login (invalid)     | Axios       | POST        | `/api/auth/login`       | Authenticate user with invalid credentials, return 401 error. | HTTP 401 + error message                                                       |
| Spec C  | Create record       | Axios       | POST        | `/api/tasks`            | Create a new task record, return 201 with created JSON.       | POST `/api/tasks` → 201 + record JSON                                          |
| Spec D  | Summary          | Axios       | GET        | `/api/sum`            | Retrieve summary information or statistics of all tasks. | HTTP 200 + summary JSON (e.g., total tasks, completed count)                                   |
| Spec E  | Update record       | Axios       | PUT         | `/api/tasks/:id`        | Update a task by ID, return 200 with updated JSON.            | PUT `/api/tasks/:id` → 200 + persisted change                                  |
| Spec F  | Delete record       | Axios       | DELETE      | `/api/tasks/:id`        | Delete a task by ID, return 200 confirmation message.         | DELETE `/api/tasks/:id` → 200 + success message                                |
| Spec G  | Currency conversion | Axios       | GET         | `/api/currency/convert` | Convert a given amount from one currency to another.          | GET `/api/currency/convert?from=USD&to=THB&amount=10` → 200 + converted result |


  * **For Developers:** Your goal is to implement features that meet the description for each Spec ID. Your Unit Tests should cover the logic for these requirements.
  * **For Testers:** Your Automation (E2E) scripts must be created to verify the functionality of each Spec ID. Test case names should correspond to the Spec ID (e.g., `test('Spec A: Successful Login...')`) for easy traceability.
