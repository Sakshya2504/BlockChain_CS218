# Identity Verification DApp

This project is a full-stack **Identity Verification System** using:

* **Frontend:** React + Vite + Tailwind CSS
* **Backend:** Node.js + Express
* **Database:** MongoDB Atlas
* **Blockchain:** Solidity + Ethers.js

---

# What This Project Does

* Users connect their **MetaMask wallet**
* Upload identity document
* Backend generates a **hash**
* Hash is stored on **blockchain**
* Verifier can **approve/revoke**
* User can check status in dashboard

---

# Project Structure

```
project/
│
├── src/ (Frontend)
│   ├── components/
│   ├── pages/
│   ├── services/
│
├── backend/
│   ├── config/
│   ├── models/
│   ├── controllers/
│   ├── routes/
│
└── README.md
```

---

# FRONTEND SETUP

```bash
npm install
npm run dev
```

---

# BACKEND SETUP

```bash
cd backend
npm install
npm run dev
```

---

# ENV SETUP (IMPORTANT)

Create file:

```
backend/.env
```

Add:

```
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

---

# API ROUTES

| Method | Route          | Use               |
| ------ | -------------- | ----------------- |
| POST   | /register      | Register user     |
| GET    | /user/:address | Get user          |
| GET    | /pending-users | Get pending users |
| POST   | /verify        | Verify user       |
| POST   | /revoke        | Revoke user       |

---

# BLOCKCHAIN SETUP (VERY IMPORTANT)

## Step 1: Deploy Contract

Use Remix:

1. Open https://remix.ethereum.org
2. Create file `IdentityVerification.sol`
3. Paste contract code
4. Compile (version 0.8.x)
5. Deploy using MetaMask (Sepolia network)

---

## Step 2: Copy These

After deployment:

* **Contract Address**
* **ABI**

---

## Step 3: Add to Frontend

Open:

```
src/services/blockchain.js
```

Replace:

```js
const CONTRACT_ADDRESS = "YOUR_CONTRACT_ADDRESS";
const CONTRACT_ABI = [];
```

With:

```js
const CONTRACT_ADDRESS = "PASTE_YOUR_ADDRESS";
const CONTRACT_ABI = [PASTE_ABI];
```

---

# HOW EVERYTHING CONNECTS

## Registration Flow

1. User connects wallet
2. Uploads document
3. Backend creates hash
4. Hash sent to blockchain

---

## Verification Flow

1. Verifier clicks verify
2. Backend updates database
3. Blockchain updates status

---

## Dashboard Flow

1. Wallet detected
2. Backend fetches user
3. Status displayed

---

# FRONTEND FILES

| File          | Work             |
| ------------- | ---------------- |
| Navbar.jsx    | Connect wallet   |
| Register.jsx  | Upload identity  |
| Dashboard.jsx | Show user data   |
| Verifier.jsx  | Verify/Revoke    |
| blockchain.js | Blockchain logic |
| api.js        | Backend calls    |

---

# BACKEND FILES

| File              | Work          |
| ----------------- | ------------- |
| server.js         | Main server   |
| db.js             | DB connection |
| User.js           | Schema        |
| userController.js | Logic         |
| userRoutes.js     | Routes        |

---

# IMPORTANT NOTES

* Do NOT push `.env` file
* Always use **Sepolia Testnet**
* Make sure MetaMask is connected
* Backend must be running before frontend

---

# HOW TO RUN FULL PROJECT

### 1. Start backend

```bash
cd backend
npm run dev
```

### 2. Start frontend

```bash
npm run dev
```

---

# TEST STEPS

1. Connect wallet
2. Register identity
3. Check MongoDB
4. Verify user
5. Check dashboard

---
