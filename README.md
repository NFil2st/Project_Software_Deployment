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
