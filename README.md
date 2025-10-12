# 💰 FinanceFlow: Financial Task Manager

## 🚀 Project Overview
FinanceFlow is a simple, secure web application designed for users to track and manage their financial tasks and small-scale transactions (e.g., "Record Monthly Expense," "Check Budget Status").

The core objective of this project is to implement a robust **Continuous Integration/Continuous Deployment (CI/CD)** pipeline, ensuring automated testing and deployment for every code change, fulfilling all group project requirements.

---

## 🔒 Project Requirements Checklist

All work must adhere to the following mandatory requirements:

1.  **Authentication:** The system **must** include at least one Login screen (Front-end or API-based authentication).
2.  **Automated Deployment:** Deployment **must** be automated via a CI/CD pipeline connected to this remote repository (e.g., GitHub, GitLab).
3.  **Containerization:** The final build **must** successfully deploy a Docker image to a Container Repository (e.g., Docker Hub or GHCR).
4.  **Unit Testing:** The project **must** contain Unit Tests equal to or exceeding the number of group members.
5.  **Quality Check:** Joint responsibility to fix issues arising from Build/Test/Deploy phases.

---

## 🛠️ CI/CD & Deployment Plan (PM Responsibility)

The automated pipeline is defined in `.github/workflows/main.yml` and must execute the following stages on every code push:

| Stage | Action | Triggered By | Responsibility |
| :--- | :--- | :--- | :--- |
| **1. Build & Lint** | Install dependencies, check code style, and build the application. | Developer Push | Developer |
| **2. Test: Unit** | Run all required Unit Tests. **Must Pass** (Minimum = Group Member Count). | Developer Push | Developer |
| **3. Test: Automation (E2E)** | Run the comprehensive Test Cases (Testing Login and CRUD functionality).  **Must Pass**. | Stage 2 Success | Tester |
| **4. Containerize** | Build the official Docker Image (`Dockerfile`). | Stage 3 Success | Developer/PM |
| **5. Deploy** | Push the Docker Image to the Container Registry.  | Stage 4 Success | PM |

---

## ✅ General Test Specification (Test Spec)

These high-level specifications (Test Spec) serve as the blueprint for the required Unit and Automation Tests:

| Feature Module | Specification (Spec ID) | Description |
| :--- | :--- | :--- |
| **Authentication** | **Spec A** | Successful Login with Valid Credentials. |
| | **Spec B** | Display Error Message for Invalid Password/Username. |
| | **Spec C** | Restrict access to internal pages without proper authentication (Authorization Check). |
| **CRUD** (Finance Record) | **Spec D** | Successful Creation of a new record with valid data. |
| | **Spec E** | API rejects data when required fields (e.g., Amount, Description) are missing (Validation). |
| | **Spec F** | User successfully updates a record and verifies the change is persisted. |
