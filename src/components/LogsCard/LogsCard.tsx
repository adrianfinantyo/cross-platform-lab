import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import React from "react";
import { cardPropsContainer } from "../../types/type";

const LogsCard: React.FC<cardPropsContainer> = (props: cardPropsContainer) => {
  return (
    <IonCard>
      <IonCardContent>
        <IonGrid>
          {props.type === "BMR" && (
            <>
              <IonRow>
                <IonText>
                  <h5>Age: {props.data?.age}</h5>
                </IonText>
              </IonRow>
              <IonRow>
                <IonText>
                  <h5>Gender: {props.data?.gender}</h5>
                </IonText>
              </IonRow>
            </>
          )}
          <IonRow>
            <IonText>
              <h5>Height: {props.data?.height}</h5>
            </IonText>
          </IonRow>
          <IonRow>
            <IonText>
              <h5>Weight: {props.data?.weight}</h5>
            </IonText>
          </IonRow>
          <IonRow>
            <IonText>
              <h5>
                {props.type}: {props.type === "BMI" ? props.data?.bmi : props.data?.bmr}
              </h5>
            </IonText>
          </IonRow>
          {props.type === "BMI" ? (
            <IonRow>
              <IonText>
                <h5>Category: {props.data?.category}</h5>
              </IonText>
            </IonRow>
          ) : (
            <IonRow>
              <IonText>
                <h5>Exercise: [{props.data?.exercise?.join(", ")}]</h5>
              </IonText>
            </IonRow>
          )}
          <IonRow>
            <IonText>
              <h5>Recorded on: {props.data?.logs.toString()}</h5>
            </IonText>
          </IonRow>
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default LogsCard;
