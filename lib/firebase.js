import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// ✅ Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6j6dRhvS7xhzLg8egevRSPE68SqzGo7w",
  authDomain: "unitedforaccountability.firebaseapp.com",
  projectId: "unitedforaccountability",
  storageBucket: "unitedforaccountability.firebasestorage.app",
  messagingSenderId: "785567711690",
  appId: "1:785567711690:web:b218b82b3270c0a17a4f33"
};

// 🧠 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔥 Initialize Firestore
const db = getFirestore(app);

export { db };
