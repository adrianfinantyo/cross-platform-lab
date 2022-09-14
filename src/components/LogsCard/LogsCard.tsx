import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import React from "react";
import { logsCardProps } from "../../types/type";

type LogsCardProps = {
  data: logsCardProps;
};

const LogsCard: React.FC<LogsCardProps> = (props: LogsCardProps) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          <IonRow>
            <IonText>
              <h5>Height: {props.data.height}</h5>
            </IonText>
          </IonRow>
          <IonRow>
            <IonText>
              <h5>Weight: {props.data.weight}</h5>
            </IonText>
          </IonRow>
          <IonRow>
            <IonText>
              <h5>BMI: {props.data.bmi}</h5>
            </IonText>
          </IonRow>
          <IonRow>
            <IonText>
              <h5>Category: {props.data.category}</h5>
            </IonText>
          </IonRow>
          <IonRow>
            <IonText>
              <h5>Recorded on: {props.data.logs.toString()}</h5>
            </IonText>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default LogsCard;
