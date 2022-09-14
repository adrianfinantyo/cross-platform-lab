import {
  IonApp,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonGrid,
  IonRow,
  IonCol,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonCard,
  IonCardContent,
  IonPage,
  IonIcon,
  IonText,
  useIonAlert,
} from "@ionic/react";
import React, { useEffect, useRef, useState } from "react";
import { BMIControls, InputControls, LogsCard } from "../../components";
import { bmiValueTypes, errorTypes, logsCardProps } from "../../types/type";

const BMICalculator: React.FC = () => {
  const [bmi, setBMI] = useState<bmiValueTypes>({ value: 0, category: "" });
  const [error, setError] = useState<errorTypes>({ isError: false, message: "" });
  const [calcUnits, setCalcUnits] = useState<"cmkg" | "ftlbs">("cmkg");
  const [logs, setLogs] = useState<logsCardProps[]>([]);

  const formBMI = useRef<any>(null);
  const [presentAlert] = useIonAlert();

  useEffect(() => {
    if (error.isError && error.message !== "") {
      presentAlert({
        header: "Error",
        message: error.message,
        buttons: ["OK"],
      });
    }
  }, [error]);

  useEffect(() => {
    if (calcUnits === "ftlbs" && formBMI.current[0]?.value != 0 && formBMI.current[1]?.value != 0) {
      formBMI.current[0] && (formBMI.current[0].value = formBMI.current[0]?.value * 0.0328);
      formBMI.current[1] && (formBMI.current[1].value = formBMI.current[1]?.value * 2.20462);
    } else if (calcUnits === "cmkg" && formBMI.current[0]?.value != 0 && formBMI.current[1]?.value != 0) {
      formBMI.current[0] && (formBMI.current[0].value = formBMI.current[0]?.value / 0.0328);
      formBMI.current[1] && (formBMI.current[1].value = formBMI.current[1]?.value / 2.20462);
    }
  }, [calcUnits]);

  const validateInput = (inputA: number, inputB: number) => {
    if (inputA == 0 || inputB == 0) {
      setError({
        isError: true,
        message: "Input cannot be 0 or empty.",
      });
      return false;
    } else if (inputA < 0 || inputB < 0) {
      setError({
        isError: true,
        message: "Input must be greater than 0.",
      });
      return false;
    }
    return true;
  };

  const handleResetForm = () => {
    formBMI.current.reset();
    setBMI({ value: 0, category: "" });
  };

  const handleSubmitForm = () => {
    const height = Number(calcUnits === "cmkg" ? formBMI.current[0].value : formBMI.current[0].value / 0.0328);
    const weight = Number(calcUnits === "cmkg" ? formBMI.current[1].value : formBMI.current[1].value / 2.20462);

    const bmi = weight / Math.pow(height / 100, 2);
    let result = "";

    if (validateInput(height, weight)) {
      if (bmi < 18.5) {
        result = "Underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        result = "Normal";
      } else if (bmi >= 25 && bmi < 30) {
        result = "Overweight";
      } else if (bmi >= 30) {
        result = "Obese";
      }

      setBMI({ value: bmi, category: result });
      setLogs([
        ...logs,
        {
          height: `${height} ${calcUnits === "cmkg" ? "cm" : "ft"}`,
          weight: `${weight} ${calcUnits === "cmkg" ? "kg" : "lbs"}`,
          bmi: bmi,
          category: result,
          logs: new Date(),
        },
      ]);
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>BMI Calculator</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <form ref={formBMI}>
          <IonGrid className="ion-text-center ion-margin">
            <IonRow>
              <IonCol>
                <InputControls selectedValue={calcUnits} handleControl={setCalcUnits} />
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Height ({calcUnits == "cmkg" ? "cm" : "ft"})</IonLabel>
                  <IonInput type="number" />
                </IonItem>
              </IonCol>
            </IonRow>
            <IonRow>
              <IonCol>
                <IonItem>
                  <IonLabel position="floating">Your Weight ({calcUnits == "cmkg" ? "kg" : "lbs"})</IonLabel>
                  <IonInput type="number" />
                </IonItem>
              </IonCol>
            </IonRow>
            <BMIControls onCalculate={handleSubmitForm} onReset={handleResetForm} />
            <IonRow>
              <IonCol>
                <IonCard>
                  <IonCardContent>
                    <IonGrid className="ion-text-center ion-margin">
                      <IonRow>
                        <IonCol>
                          <IonText>
                            <h5>BMI Value</h5>
                          </IonText>
                          <IonText>
                            <h1>{bmi.value == 0 ? "[Result]" : bmi.value}</h1>
                          </IonText>
                        </IonCol>
                      </IonRow>
                      <IonRow>
                        <IonCol>
                          <IonText>
                            <h5>Result</h5>
                          </IonText>
                          <IonText>
                            <h1>{bmi.category == "" ? "Category of Your BMI" : bmi.category}</h1>
                          </IonText>
                        </IonCol>
                      </IonRow>
                    </IonGrid>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            </IonRow>
          </IonGrid>
        </form>
        <IonGrid>
          <IonRow>
            <IonCol>
              {logs?.map((item) => (
                <LogsCard data={item} />
              ))}
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default BMICalculator;
