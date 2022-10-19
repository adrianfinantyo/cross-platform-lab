import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";

const Settings: React.FC = () => {
  const { setTitle } = useContext(GlobalContext);

  useEffect(() => {
    setTitle("Settings");
  }, []);

  return (
    <div className="ion-padding">
      <IonText>
        <h1>Settings</h1>
      </IonText>
    </div>
  );
};

export default Settings;
