import { IonSegment, IonSegmentButton, IonLabel } from "@ionic/react";
import React from "react";
import { inputControlsProps } from "../../types/type";

const InputControls: React.FC<inputControlsProps> = (props: inputControlsProps) => {
  const handleChangeHandler = (event: CustomEvent) => {
    props.handleControl(event.detail.value);
  };

  return (
    <IonSegment value={props.selectedValue} onIonChange={handleChangeHandler}>
      <IonSegmentButton value="cmkg">
        <IonLabel>cm/kg</IonLabel>
      </IonSegmentButton>
      <IonSegmentButton value="ftlbs">
        <IonLabel>ft/lbs</IonLabel>
      </IonSegmentButton>
    </IonSegment>
  );
};

export default InputControls;
