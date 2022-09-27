import React from "react";
import { IonRow, IonCol, IonButton, IonIcon, IonText } from "@ionic/react";
import { calculatorOutline, refreshOutline } from "ionicons/icons";
import { BMIControlsProps } from "../../types/type";

const BMIControl: React.FC<BMIControlsProps> = (props: BMIControlsProps) => {
  return (
    <IonRow>
      <IonCol size="12" size-md="6" className="ion-text-center">
        <IonButton expand="block" color="success" type="button" onClick={props.onCalculate}>
          <IonIcon icon={calculatorOutline} />
          <IonText>Calculate</IonText>
        </IonButton>
      </IonCol>
      <IonCol size="12" size-md="6" className="ion-text-center">
        <IonButton fill="clear" color="medium" type="button" onClick={props.onReset}>
          <IonIcon icon={refreshOutline} />
          <IonText>Reset</IonText>
        </IonButton>
      </IonCol>
    </IonRow>
  );
};

export default BMIControl;
