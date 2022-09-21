import { IonButton, IonCol, IonContent, IonGrid, IonHeader, IonPage, IonRow, IonText, IonTitle, IonToolbar } from "@ionic/react";
import { useContext, useEffect } from "react";
import ExploreContainer from "../../components/ExploreContainer";
import { GlobalContext } from "../../GlobalContext";

const Home: React.FC = () => {
  const { setTitle } = useContext(GlobalContext);

  useEffect(() => {
    setTitle("Calculator");
  }, []);

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <IonText>42580 - Bonifasius Ariesto Adrian Finantyo</IonText>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton className="btn-padding" routerLink="/bmi-calculator" expand="block">
              BMI CALCULATOR
            </IonButton>
          </IonCol>
        </IonRow>
        <IonRow>
          <IonCol>
            <IonButton routerLink="/bmr-calculator" expand="block">
              BMR CALCULATOR
            </IonButton>
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default Home;
