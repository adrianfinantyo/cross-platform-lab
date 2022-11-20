import { Geolocation } from "@capacitor/geolocation";
import Geocode from "react-geocode";
import axios from "axios";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { db, storage } from "./firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export const APP_CONFIG = {
  googleApiKey: "AIzaSyCgbc7hxjvdPIuNmJsIcoF4Z3ZYuWZZmLU",
  baseUrl: "http://localhost/xplat-w10-api",
};

Geocode.setApiKey(APP_CONFIG.googleApiKey);
Geocode.setLocationType("ROOFTOP");

export const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
  });

  return coordinates;
};

export const postNewMemories = async (
  photoName: string,
  title: string,
  type: string,
  base64Data: string,
  currentPosition: google.maps.LatLngLiteral
) => {
  const storageRef = ref(storage, `memories/${photoName}`);
  uploadBytes(storageRef, await convertBase64ToBlob(base64Data)).then((snapshot) => {
    getDownloadURL(storageRef).then(async (url) => {
      await addDoc(collection(db, "memories"), {
        title: title,
        type: type,
        photoName: photoName,
        position: currentPosition,
        photoUrl: url,
      });
    });
  });
};

export const getAllMemories = async (type: "good" | "bad") => {
  const response = await getDocs(collection(db, "memories"));
  return response.docs.map((doc) => doc.data());
};

export const convertBase64ToBlob = async (base64: string) => {
  const res = await fetch(base64);
  return res.blob();
};
