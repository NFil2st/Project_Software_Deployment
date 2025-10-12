# 💰 Financial To-Do List Application

## 🚀 Project Overview
Application is a simple, secure web application designed to help users track and manage their financial tasks and transactions (e.g., "Pay bills," "Budget review," "Record expense for Q3").

The primary goal of this project is to implement a robust **Continuous Integration/Continuous Deployment (CI/CD)** pipeline, ensuring automated testing and deployment for every code change.

---

## 🔒 Key Requirements & Deliverables (Must-Haves)

All work must adhere to the following mandatory requirements:

1.  **Authentication:** The system **must** include at least one Login screen (Front-end or API-based authentication).
2.  **Automated Deployment:** Deployment **must** be automated via a CI/CD pipeline connected to this remote repository (e.g., GitHub Actions).
3.  **Containerization:** The final build **must** successfully deploy a Docker image to a Container Repository (e.g., Docker Hub or GitHub Container Registry).
4.  **Unit Testing:** The project **must** contain Unit Tests equal to or exceeding the number of group members.

---

## 🛠️ CI/CD & Deployment Plan (PM Responsibility)

The automated pipeline is defined in `.github/workflows/main.yml` (or equivalent) and must execute the following stages on every push to the `main` or a `feature/` branch:

| Stage | Action | Responsibility |
| :--- | :--- | :--- |
| **1. Build & Lint** | Install dependencies, check code style, and build the application. | Developer |
| **2. Test: Unit** | Run all Unit Tests (minimum = group members). **Must Pass** before proceeding. | Developer/Tester |
| **3. Test: Integration/E2E** | Run the Automation Test Suite (Testing Login and CRUD functionality). **Must Pass**. | Tester |
| **4. Containerize** | Build the official Docker Image for the application. | Developer/PM |
| **5. Deploy** | Push the Docker Image to the Container Registry (e.g., Docker Hub). | PM |

---

## ✅ General Test Specification (Test Spec)

The following high-level specifications are the basis for all required testing:

### A. Authentication Module (Spec A-C)
* **Unit Tests:** Validate password hashing, token generation, and input validation logic.
* **Automation Tests (E2E):** Verify successful login with valid credentials (Spec A), and verify error messages with invalid credentials (Spec B).

### B. CRUD Module (Spec D-F)
* **Unit Tests:** Validate data structure before saving (e.g., amount must be a number, description cannot be empty).
* **Automation Tests (E2E):** Verify that a user can successfully Create (D), Read, Update, and Delete (F) a financial record after logging in.

*(Detail specifications are located in the `docs/TEST_SPEC.md` file.)*
