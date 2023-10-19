import {initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";


const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SERVER_ID,
  appId: process.env.REACT_APP_APP_ID
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app); 
const provider = new GoogleAuthProvider();

export { auth};
export default app;
export {provider};
export const db = getFirestore(app)
export const analytics = getAnalytics(app);