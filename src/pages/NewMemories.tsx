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

type photoType = {
  preview: string;
};

const NewMemories: React.FC = () => {
  const history = useHistory();
  const { addMemory } = useContext(MemoryContext);
  const { backButton, iosAddButton, themeButton } = useContext(GlobalContext);
  const [takenPhoto, setTakenPhoto] = React.useState<photoType>();
  const [choosenMemoryType, setChoosenMemoryType] = React.useState<"good" | "bad">("good");
  const titleRef = useRef<HTMLIonInputElement>(null);

  const selectMemoryTypeHandler = (event: CustomEvent) => {
    const selectedMemoryType = event.detail.value;
    setChoosenMemoryType(selectedMemoryType);
  };

  useEffect(() => {
    backButton.set(true);
    iosAddButton.set(false);
    themeButton.set(false);
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
    if (!enteredTitle || enteredTitle.toString().trim().length === 0 || !takenPhoto || !choosenMemoryType) {
      return;
    }

    const fileName = new Date().getTime() + ".jpeg";
    const base64Data = await base64FromPath(takenPhoto!.preview!);
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data,
    });

    addMemory(fileName, enteredTitle.toString(), choosenMemoryType, base64Data);
    history.length > 0 ? history.goBack() : history.replace("/memories/good");
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
      <IonRow className="ion-margin-top ion-text-center">
        <IonCol>
          <IonButton onClick={handleAddMemory}>Add Memory</IonButton>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default NewMemories;
