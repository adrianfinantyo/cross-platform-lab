import { Geolocation } from "@capacitor/geolocation";
import Geocode from "react-geocode";

export const APP_CONFIG = {
  googleApiKey: "AIzaSyCgbc7hxjvdPIuNmJsIcoF4Z3ZYuWZZmLU",
};

Geocode.setApiKey(APP_CONFIG.googleApiKey);
Geocode.setLocationType("ROOFTOP");

export const getCurrentPosition = async () => {
  const coordinates = await Geolocation.getCurrentPosition({
    enableHighAccuracy: true,
  });

  return coordinates;
};
