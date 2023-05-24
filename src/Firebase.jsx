import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyA12HF8g1oae92jMhPLH5Gp2aAQu2tXfok",
  authDomain: "flowchartgpt.firebaseapp.com",
  projectId: "flowchartgpt",
  storageBucket: "flowchartgpt.appspot.com",
  messagingSenderId: "904320356478",
  appId: "1:904320356478:web:d5b48662336e770467c82f",
  measurementId: "G-X326FRFWGL",
};

const app = initializeApp(firebaseConfig);

export default app;
