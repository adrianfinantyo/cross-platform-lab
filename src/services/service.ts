import { Geolocation } from "@capacitor/geolocation";
import Geocode from "react-geocode";
import axios from "axios";

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

export const postNewMemories = async (photoName: string, title: string, type: string, base64Data: string, currentPosition: google.maps.LatLngLiteral) => {
  try {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("type", type);
    formData.append("photo", await convertBase64ToBlob(base64Data));
    formData.append("photoName", photoName);
    formData.append("position", JSON.stringify(currentPosition));

    const response = await axios.post(`${APP_CONFIG.baseUrl}/insert_new_memory.php`, formData);
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};

export const getAllMemories = async (type: "good" | "bad") => {
  const response = await axios.get(`${APP_CONFIG.baseUrl}/select_all_${type}_memory.php`);
  return response.data;
};

export const convertBase64ToBlob = async (base64: string) => {
  const res = await fetch(base64);
  return res.blob();
};
