import { IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonText } from "@ionic/react";
import React from "react";
import { cardPropsContainer } from "../../types/type";
import "./ResultCard.css";

const ResultCard: React.FC<cardPropsContainer> = (props: cardPropsContainer) => {
  return (
    <IonCard
      className="result-card"
      color={
        props.type === "BMI"
          ? props.data?.category === "Normal"
            ? "success"
            : props.data?.category === "Underweight" || props.data?.category === "Overweight"
            ? "warning"
            : props.data?.category === "Obese"
            ? "danger"
            : "primary"
          : "primary"
      }
    >
      <IonCardContent>
        <IonGrid className="ion-text-center ion-margin">
          {props.type === "BMI" ? (
            <>
              <IonRow>
                <IonCol>
                  <IonText>
                    <h5>BMI Value</h5>
                  </IonText>
                  <IonText>
                    <h1>{props.data?.bmi ? props.data?.bmi : "[BMI Result]"}</h1>
                  </IonText>
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonText>
                    <h5>Result</h5>
                  </IonText>
                  <IonText>
                    <h1>{props.data?.category ? props.data?.category : "Category of Your BMI"}</h1>
                  </IonText>
                </IonCol>
              </IonRow>
            </>
          ) : (
            <>
              <IonRow>
                <IonCol>
                  <h5>
                    <IonText>BMR</IonText>
                  </h5>
                  <IonText>
                    <h1>{props.data?.bmr ? props.data?.bmr : "[BMR Result]"}</h1>
                  </IonText>
                  <IonText>
                    <h5>
                      <IonText>Calories/day</IonText>
                    </h5>
                  </IonText>
                  {props.data?.exercise && (
                    <>
                      <IonText>Daily calorie needs based on activity level</IonText>
                      <table className="ion-text-left" style={{ width: "100%" }}>
                        <colgroup>
                          <col span={1} style={{ width: "75%" }} />
                          <col span={1} style={{ width: "25%" }} />
                        </colgroup>
                        <thead>
                          <th>
                            <b>Activity</b>
                          </th>
                          <th>
                            <b>Calorie</b>
                          </th>
                        </thead>
                        <tbody>
                          <tr>
                            <td>Sedentary: little or no exercise</td>
                            <td>{props.data?.exercise[0]}</td>
                          </tr>
                          <tr>
                            <td>Exercise 1-3 times/week</td>
                            <td>{props.data?.exercise[1]}</td>
                          </tr>
                          <tr>
                            <td>Exercise 4-5 times/week</td>
                            <td>{props.data?.exercise[2]}</td>
                          </tr>
                          <tr>
                            <td>Daily exercise or Intense exercise 3-4 times/week</td>
                            <td>{props.data?.exercise[3]}</td>
                          </tr>
                          <tr>
                            <td>Intense exercise 6-7 times/week</td>
                            <td>{props.data?.exercise[4]}</td>
                          </tr>
                        </tbody>
                      </table>
                    </>
                  )}
                </IonCol>
              </IonRow>
            </>
          )}
        </IonGrid>
      </IonCardContent>
    </IonCard>
  );
};

export default ResultCard;
