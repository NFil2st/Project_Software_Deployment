# 🧑‍💻 Developer Guide

## 1. Feature Development: CRUD Operations
The core feature is CRUD for financial records. Records must include: **Type** (Income/Expense), **Description**, **Amount**, and **Date**.

## 2. Unit Test Requirements (PM Mandate)

You must write Unit Tests that satisfy the PM's mandate:
* **Minimum Coverage:** You must have **at least 5 Unit Tests**.
* **Focus Areas:**
    * **Authentication Logic:** Test the function responsible for validating user input (e.g., minimum password length, valid email format).
    * **CRUD Data Validation:** Write tests to ensure the API/Service layer correctly rejects invalid financial data (e.g., negative amounts, missing descriptions) (Spec E).

## 3. Working with the CI/CD Pipeline

The pipeline runs automatically on every push. Your goal is to keep the pipeline **GREEN**:
1.  **Build Compatibility:** Ensure your code can be built successfully on the clean environment defined by the pipeline.
2.  **Local Testing:** Always run locally before pushing to ensure your Unit Tests pass.
3.  **Dockerization:** Work with the PM to maintain the `Dockerfile` to ensure the application builds correctly into a stable container.
