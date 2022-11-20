import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBhCNQTw0zCdiryhp57TwJ4_OltELrHTtQ",
  authDomain: "week11-xplat.firebaseapp.com",
  projectId: "week11-xplat",
  storageBucket: "week11-xplat.appspot.com",
  messagingSenderId: "233308710199",
  appId: "1:233308710199:web:1eb2d819742fc9ab10e6b2",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
