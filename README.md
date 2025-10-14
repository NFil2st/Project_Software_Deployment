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

## 📋 General Test Specification (Test Spec)

This table serves as the **"blueprint"** and **"shared agreement"** between Developers and Testers. All development and testing must adhere to these specifications.

| Feature Module | Specification (Spec ID) | Description |
| :--- | :--- | :--- |
| **Authentication** | **Spec A** | A user can successfully log in with valid credentials. |
| | **Spec B** | The system displays an error message for an invalid password or username. |
| | **Spec C** | The system restricts access to internal pages without proper authentication (Authorization Check). |
| **CRUD** (Finance Record) | **Spec D** | A user can successfully create a new record with valid data. |
| | **Spec E** | The API rejects data when required fields (e.g., Amount, Description) are missing (Validation). |
| | **Spec F** | A user can successfully update a record and verify that the change is persisted. |

**How to Use This Table:**

  * **For Developers:** Your goal is to implement features that meet the description for each Spec ID. Your Unit Tests should cover the logic for these requirements.
  * **For Testers:** Your Automation (E2E) scripts must be created to verify the functionality of each Spec ID. Test case names should correspond to the Spec ID (e.g., `test('Spec A: Successful Login...')`) for easy traceability.
