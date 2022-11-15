import { IonItem, IonLabel, IonInput, IonCol, IonGrid, IonRow, IonButton, IonIcon, IonSelect, IonSelectOption } from "@ionic/react";
import { camera } from "ionicons/icons";
import React, { useContext, useEffect, useRef } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Directory, Filesystem } from "@capacitor/filesystem";
import { base64FromPath } from "@ionic/react-hooks/filesystem";
import "./NewMemories.css";
import { MemoryContext } from "../context/MemoryContext";
import { useHistory } from "react-router";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { APP_CONFIG, getCurrentPosition } from "../services/service";

type photoType = {
  preview: string;
};

const NewMemories: React.FC = () => {
  const history = useHistory();
  const { addMemory } = useContext(MemoryContext);
  const { backButton, iosAddButton, themeButton } = useContext(GlobalContext);
  const [takenPhoto, setTakenPhoto] = React.useState<photoType>();
  const [choosenMemoryType, setChoosenMemoryType] = React.useState<"good" | "bad">("good");
  const [currentPosition, setCurrentPosition] = React.useState<google.maps.LatLngLiteral>({ lat: 0, lng: 0 });

  const titleRef = useRef<HTMLIonInputElement>(null);

  const selectMemoryTypeHandler = (event: CustomEvent) => {
    const selectedMemoryType = event.detail.value;
    setChoosenMemoryType(selectedMemoryType);
  };

  useEffect(() => {
    backButton.set(true);
    iosAddButton.set(false);
    themeButton.set(false);
    getCurrentPosition().then((position) => {
      setCurrentPosition({ lat: position.coords.latitude, lng: position.coords.longitude });
    });
  }, []);

  const handleTakePhoto = async () => {
    const photo = await Camera.getPhoto({
      quality: 90,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      width: 500,
    });

    if (!photo || !photo.webPath) {
      return;
    }

    if (!photo || !photo.webPath) {
      console.log("return");
      return;
    }

    setTakenPhoto({
      preview: photo.webPath,
    });
  };

  const handleAddMemory = async () => {
    const enteredTitle = titleRef.current?.value;
    if (!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !choosenMemoryType || !currentPosition) {
      return;
    }

    const fileName = new Date().getTime() + ".jpeg";
    const base64Data = await base64FromPath(takenPhoto!.preview!);
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    addMemory(fileName, enteredTitle.toString(), choosenMemoryType, base64Data, currentPosition);
    history.length > 0 ? history.goBack() : history.replace("/memories/good");
  };

  const handleSelectPos = (event: google.maps.MapMouseEvent) => {
    if (event.latLng?.lat() || event.latLng?.lng()) {
      setCurrentPosition({ lat: event.latLng.lat(), lng: event.latLng.lng() });
    }
  };

  return (
    <IonGrid>
      <IonRow>
        <IonCol>
          <IonItem>
            <IonLabel position="floating">Memory Title</IonLabel>
            <IonInput placeholder="Enter memory title" ref={titleRef}></IonInput>
          </IonItem>
        </IonCol>
      </IonRow>
      <IonRow className="ion-text-center">
        <IonCol>
          <div className="image-preview">{takenPhoto ? <img src={takenPhoto.preview} alt="Preview" /> : <h3>No photo choosen.</h3>}</div>
          <IonButton fill="clear" onClick={handleTakePhoto}>
            <IonIcon slot="start" icon={camera} />
            <IonLabel>Take Photo</IonLabel>
          </IonButton>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <IonSelect onIonChange={selectMemoryTypeHandler} placeholder="Select memory type">
            <IonSelectOption value="good">Good Memory</IonSelectOption>
            <IonSelectOption value="bad">Bad Memory</IonSelectOption>
          </IonSelect>
        </IonCol>
      </IonRow>
      <IonRow>
        <IonCol>
          <LoadScript googleMapsApiKey={APP_CONFIG.googleApiKey}>
            <GoogleMap mapContainerStyle={{ width: "100%", height: "50vh" }} center={currentPosition} zoom={10} onClick={handleSelectPos}>
              <Marker position={currentPosition} />
            </GoogleMap>
          </LoadScript>
        </IonCol>
      </IonRow>
      <IonRow className="ion-margin-top ion-text-center">
        <IonCol>
          <IonButton onClick={handleAddMemory}>Add Memory</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default NewMemories;
