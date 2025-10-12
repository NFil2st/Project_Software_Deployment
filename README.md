# 🧪 Tester Guide: FinanceFlow Quality Assurance

Your role is to ensure system quality by developing and executing Automation Test Cases via the CI/CD Pipeline.

## 1. Automation Test Development
]You will receive the Test Specification (Test Spec) from the PM and develop the corresponding Test Cases using a suitable automation framework.

* **Execution Platform:** All test scripts **must** be configured to run automatically on the CI/CD Pipeline.
* **Focus Areas (Test Cases):** Your test cases must cover the following PM specifications:

| Spec ID | Required Automation Test Case |
| :--- | :--- |
| **Spec A, B, C** | **Login Test Suite:** Full End-to-End verification of login/logout and authorization flows. |
| **Spec D, E, F** | **CRUD Workflow Test:** A single E2E test that verifies the full lifecycle of a financial record (Create $\rightarrow$ Read $\rightarrow$ Update $\rightarrow$ Delete). |

## 2. Quality Verification on CI/CD
You are responsible for monitoring the quality of the system after automated processes.
1.  **Test Results:** Verify that the **Unit Test** results from the Developer and your **Automation Test** results are successful.
2.  **Post-Deployment Check:** Verify that the deployed application (from the Container Registry) is accessible and functional.
3.  **Troubleshooting:** Collaborate with the Developer and PM to identify and fix issues that cause the Build, Test, or Deploy stages to fail.

## 3. General Test Specification (Test Spec)

These high-level specifications (Test Spec) serve as the blueprint for the required Unit and Automation Tests:

| Feature Module | Specification (Spec ID) | Description |
| :--- | :--- | :--- |
| **Authentication** | **Spec A** | Successful Login with Valid Credentials. |
| | **Spec B** | Display Error Message for Invalid Password/Username. |
| | **Spec C** | Restrict access to internal pages without proper authentication (Authorization Check). |
| **CRUD** (Finance Record) | **Spec D** | Successful Creation of a new record with valid data. |
| | **Spec E** | API rejects data when required fields (e.g., Amount, Description) are missing (Validation). |
| | **Spec F** | User successfully updates a record and verifies the change is persisted. |
