# React Task – Student Management System

A simple React + TypeScript CRUD application for managing students.  
Features include adding, updating, deleting, and logging in students.  
Passwords are securely encrypted using AES** before being stored.

# Setup Instructions

1. Clone the Repository
git clone https://github.com/ashishsoni-git/React-Task-for-Resolute-Solutions.git
cd React-Task-for-Resolute-Solutions/task-react-typescript

2. Install Dependencies
npm install

3. Start the Mock Backend (JSON Server)
npx json-server --watch db.json --port 5000
This runs a local backend at: 
http://localhost:5000/students

4. Run the React Project
npm start
Your app will now be running at:
http://localhost:3000

# Tech Stack Used
React (TypeScript) → Frontend framework
Fetch API → For API requests (CRUD operations)
JSON Server → Mock backend for student data
CryptoJS (AES Encryption) → Encrypt/decrypt student passwords
CSS / Inline Styles → For styling components

# How Encryption is Implemented
To ensure passwords are never stored in plain text, the project uses AES encryption with crypto-js.

# Encryption before storing password
import CryptoJS from "crypto-js";
const SECRET_KEY = "mysecretkey";
export const encrypt = (text: string): string => {
  return CryptoJS.AES.encrypt(text, SECRET_KEY).toString();
};

# Decryption while login

export const decrypt = (cipher: string): string => {
  const bytes = CryptoJS.AES.decrypt(cipher, SECRET_KEY);
  return bytes.toString(CryptoJS.enc.Utf8);
};
This ensures passwords saved in the database (db.json) are always encrypted.

# Features

Student registration with validation
Password encryption & secure login
CRUD operations using Fetch API
Update & delete student records
JSON Server mock API

# Screenshots
<img width="1918" height="906" alt="Screenshot 4" src="https://github.com/user-attachments/assets/e652caa1-d249-4917-b347-8e46940c8354" />
<img width="1918" height="903" alt="Screenshot 3" src="https://github.com/user-attachments/assets/0f6a8ed7-977a-4428-aec6-9a0b60b1c756" />
<img width="1918" height="907" alt="Screenshot 2" src="https://github.com/user-attachments/assets/15f67220-65ac-4643-a5b6-21aac121b6fb" />
<img width="1917" height="900" alt="screenshot 1" src="https://github.com/user-attachments/assets/0b501aef-5f70-4fde-8dca-7c3c26e2a903" />

