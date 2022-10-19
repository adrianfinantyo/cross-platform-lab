import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";

const Spam: React.FC = () => {
  const { setTitle } = useContext(GlobalContext);

  useEffect(() => {
    setTitle("Spam");
  }, []);

  return (
    <div className="ion-padding">
      <IonText>
        <h1>Spam</h1>
      </IonText>
    </div>
  );
};

export default Spam;
