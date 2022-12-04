// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAxQdhtchMQCd40DAXwT4g5cO2Y04FjA8s",
  authDomain: "node-ecommerce-bf117.firebaseapp.com",
  projectId: "node-ecommerce-bf117",
  storageBucket: "node-ecommerce-bf117.appspot.com",
  messagingSenderId: "556955321044",
  appId: "1:556955321044:web:c03c139abd69a198453141"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;