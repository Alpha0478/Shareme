import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyDqf0PFlXP0sZe2Ff-ncFhxbC2HwVtXyEM",
  authDomain: "video-ceedb.firebaseapp.com",
  projectId: "video-ceedb",
  storageBucket: "video-ceedb.appspot.com",
  messagingSenderId: "265928480230",
  appId: "1:265928480230:web:f9ec6678d345056b0a3227",
  measurementId: "G-LP51K47LK9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const provider = new GoogleAuthProvider();
export default app;

