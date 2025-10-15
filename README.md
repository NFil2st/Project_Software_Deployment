# 🧪 Tester Guide — Integration with Dev Step-by-Step


## 🧭 Overview — Tester role in the repo flow

**Goal:** Deliver reliable Automation (E2E) tests that run in CI for Specs A–F and verify deployed containers.

**Working branches:**

* `dev` — dev work (Dev runs unit tests here)
* `test` — QA/E2E validation (Tester’s automation runs here)
* `main` — production deploy (full pipeline + Docker push)

Tester is responsible for:

* Implementing E2E automation for specs A–F.
* Adding tests to CI (run on `test`).
* Validating CI artifacts, logs, and deployed service.
* Opening issues and coordinating fixes.

---

## 1. Test repository structure (recommended)

Place test files and fixtures in the repository so CI can run them easily:

```
/tests
  /e2e            # tester-owned end-to-end tests (Axios/HTTP Client)
  /fixtures       # JSON fixtures (sample users)
jest.config.ts    # ts-jest config for TypeScript
package.json      # includes test scripts
```

---

## 2. Tools & Setup (what to use)

| Area              | Recommended Tools                                                           |
| ----------------- | --------------------------------------------------------------------------- |
| API E2E           | **Jest + Axios/HTTP Client + ts-jest**                                      |
| CI Runner         | **GitHub Actions** (runs on `test` branch)                                  |


Add these devDependencies (example):

```json
"devDependencies": {
    "jest": "latest",
    "axios": "latest", 
    "ts-jest": "latest",
    "@types/jest": "latest",
    "@types/axios": "latest"
}
```

Add scripts in `package.json`:

```json
"scripts": {
  "test": "jest --runInBand",
  "test:e2e": "jest --testPathPattern=tests/e2e",
  "build": "tsc" 
}
```

---

## 3. Spec → Test mapping (must be automated)

| Spec ID | Test Suite          | HTTP Client | HTTP Method | API Endpoint            | Description                                                   | Expected Outcome (CI)                                                          |
| ------- | ------------------- | ----------- | ----------- | ----------------------- | ------------------------------------------------------------- | ------------------------------------------------------------------------------ |
| Spec A  | Login (valid)       | Axios       | POST        | `/api/auth/login`       | Authenticate user with valid credentials, return JWT token.   | HTTP 200 + `token` (JWT)                                                       |
| Spec B  | Login (invalid)     | Axios       | POST        | `/api/auth/login`       | Authenticate user with invalid credentials, return 401 error. | HTTP 401 + error message                                                       |
| Spec C  | Create record       | Axios       | POST        | `/api/tasks`            | Create a new task record, return 201 with created JSON.       | POST `/api/tasks` → 201 + record JSON                                          |
| Spec D  | Validation          | Axios       | POST        | `/api/tasks`            | Create task with missing fields, return 400 validation error. | POST missing fields → 400 + validation error                                   |
| Spec E  | Update record       | Axios       | PUT         | `/api/tasks/:id`        | Update a task by ID, return 200 with updated JSON.            | PUT `/api/tasks/:id` → 200 + persisted change                                  |
| Spec F  | Delete record       | Axios       | DELETE      | `/api/tasks/:id`        | Delete a task by ID, return 200 confirmation message.         | DELETE `/api/tasks/:id` → 200 + success message                                |
| Spec G  | Currency conversion | Axios       | GET         | `/api/currency/convert` | Convert a given amount from one currency to another.          | GET `/api/currency/convert?from=USD&to=THB&amount=10` → 200 + converted result |



---

## 4. Step-by-step — Write & run tests locally (Tester)

Follow this checklist for each Spec:

1. **Get the Test Spec from PM**

   * Confirm exact request/response shapes (API_CONTRACT.md).
   * Confirm auth flow (JWT secret, demo user credentials).

2. **Create fixtures**

   * `tests/fixtures/user.json` (demo username/password)
   * `tests/fixtures/task.json` (valid task, invalid payload)

3. **Write E2E tests (example path: `tests/e2e/auth.e2e.test.ts`)**

4. **Add flow tests for CRUD (single E2E test covers D→E→F)**

5. **Run tests locally**

   * `npm ci` then `npm run test:e2e`
   * Fix failures or open issue with details: failing test name, logs, request/response.

---

## 5. Step-by-step — Integrate tests into CI (GitHub Actions)

Create minimal workflow `.github/workflows/test-e2e.yml` triggered on pushes to `test`:

```yaml
name: E2E Tests (Axios Client)

on:
  push:
    branches: [ test ]

jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: 
          node-version: '20' # แนะนำให้อัพเดทเป็น Node 20 หากโค้ดรองรับ
      
      - name: Install dependencies
        run: npm ci
        
      # 1. Build TypeScript 
      - name: Compile TypeScript
        run: npm run build
        
      # 2. Start Express Server ใน Background (รัน node dist/index.js)
      - name: Start Express Server
        run: npm start & 
        env:
          # หากต้องการใช้ Test DB URI ควรตั้งค่าใน Secrets แล้วเรียกใช้ที่นี่
          PORT: 3000
        
      # Wait 10 วินาทีให้ Server และ DB Connection (Mongoose) พร้อม
      - name: Wait for server to be ready
        run: sleep 10s 

      # 3. รัน E2E Tests (ใช้ Axios/HTTP Client)
      - name: Run E2E Tests
        run: npm run test:e2e
        # ไม่จำเป็นต้องตั้ง NODE_ENV=test เนื่องจาก server รันแบบ full stack 
      
      # 4. อัปโหลด logs/artifacts
      - name: Upload test logs
        if: always()
        uses: actions/upload-artifact@v4
        with:
          name: e2e-logs
          path: ./test-results || ./coverage || ./logs
```

**CI Requirements:**

* `src/index` must `export default app` and not `listen()` when `NODE_ENV === 'test'`.
* If JWT secret required, set `JWT_SECRET` via repo **Secrets**.
* If DB required, use `services` in workflow (or test DB connection string in secrets).

---

## 6. Interpreting CI results (what to verify)

When CI runs, confirm:

* **Exit code 0** (no failing tests).
* **Artifacts uploaded** (log file or coverage).
* **No flakiness**: repeated runs should be consistent.
* **If failure occurs**, collect:

  * Action run URL
  * Test name(s) and stack trace
  * Exact request payload and response (sanitized)
  * Assign issue to developer with reproduction steps

---

## 7. Post-deployment verification (after `main` pipeline deploy)

Once `main` pipeline builds & pushes Docker image and deploys:

1. **Sanity check**: `curl` root or health endpoint (e.g., `GET /health` -> 200).
2. **Smoke tests**: run a quick authorized GET `/api/tasks` and POST/DELETE sample to confirm live behavior.
3. **Record results**: If mismatch from staging / test expectations, open a blocker issue.

---

## 8. Best practices & checklist (quick)

* [ ] Tests cover both success and failure scenarios (positive & negative assertions).
* [ ] Tests are deterministic: reset data or use isolated test DB per run.
* [ ] Each test file names map to Spec IDs (e.g., `spec-A-auth.test.ts`).
* [ ] CI stores test logs and coverage artifacts.
* [ ] Tester documents failing test in an Issue with clear reproduction steps.

---

## 9. Example filenames to commit (convention)

```
tests/e2e/spec-A-B-user-create-get.e2e.test.ts
tests/e2e/spec-C-D-user-update-delete.e2e.test.ts
tests/e2e/spec-E-F-validation.e2e.test.ts
```

---

## 10. Quick troubleshooting tips (Tester → Dev handoff)

* If token invalid: verify `JWT_SECRET` in CI and `.env.test`.
* If test times out: increase Jest timeout temporarily and profile endpoint latency.
* If DB state leaking: ensure model resets in `beforeEach` or use transactions.

---

### ✅ Final goal for Tester:

All Specs A–F pass in the `test` branch CI; test artifacts uploaded; no open blocking QA issues before PR to `main`.

---
