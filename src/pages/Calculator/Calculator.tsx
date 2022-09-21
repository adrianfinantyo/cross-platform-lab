import { IonGrid, IonRow, IonCol, IonItem, IonLabel, IonInput, IonCard, IonCardContent, IonText, useIonAlert, IonRadio, IonRadioGroup } from "@ionic/react";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BMIControls, InputControls, LogsCard, ResultCard } from "../../components";
import { GlobalContext } from "../../GlobalContext";
import { errorTypes, logsCardProps } from "../../types/type";
import { Controller, useForm } from "react-hook-form";
import "./Calculator.css";
type formTypes = {
  age?: number | null;
  gender?: string | null;
  weight: number;
  height: number;
  errors: {
    age?: errorTypes;
    gender?: errorTypes;
    weight: errorTypes;
    height: errorTypes;
  };
};

const Calculator: React.FC<any> = ({ type }: { type: "BMI" | "BMR" }) => {
  const [calcUnits, setCalcUnits] = useState<"cmkg" | "ftlbs">("cmkg");
  const [logsBMI, setLogsBMI] = useState<logsCardProps[]>([]);
  const [logsBMR, setLogsBMR] = useState<logsCardProps[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    control,
    formState: { errors },
  } = useForm<formTypes>({
    defaultValues: {
      age: null,
      gender: null,
      weight: undefined,
      height: undefined,
    },
  });

  const formBMI = useRef<any>(null);
  // const [presentAlert] = useIonAlert();

  const { setTitle } = useContext(GlobalContext);

  useEffect(() => {
    if (type === "BMI") {
      setTitle("BMI Calculator");
    } else if (type === "BMR") {
      setTitle("BMR Calculator");
    }
  }, []);

  useEffect(() => {
    if (calcUnits === "ftlbs" && getValues("height") && getValues("weight")) {
      setValue("weight", getValues("weight") * 2.20462);
      setValue("height", getValues("height") * 0.0328084);
    } else if (calcUnits === "cmkg" && getValues("height") && getValues("weight")) {
      setValue("weight", getValues("weight") / 2.20462);
      setValue("height", getValues("height") / 0.0328084);
    }
  }, [calcUnits]);

  const handleResetForm = () => {
    console.log(getValues());
    reset();
    setValue("age", null);
    setValue("gender", null);
    console.log(getValues());
  };

  const handleSubmitForm = (data: any) => {
    const height = calcUnits === "cmkg" ? data.height : data.height / 0.0328084;
    const weight = calcUnits === "cmkg" ? data.weight : data.weight / 2.20462;

    if (type === "BMI") {
      const bmi = weight / Math.pow(height / 100, 2);
      let result = "";

      if (bmi < 18.5) {
        result = "Underweight";
      } else if (bmi >= 18.5 && bmi < 25) {
        result = "Normal";
      } else if (bmi >= 25 && bmi < 30) {
        result = "Overweight";
      } else if (bmi >= 30) {
        result = "Obese";
      }

      setLogsBMI([
        ...logsBMI,
        {
          height: `${data.height} ${calcUnits === "cmkg" ? "cm" : "ft"}`,
          weight: `${data.weight} ${calcUnits === "cmkg" ? "kg" : "lbs"}`,
          bmi: bmi,
          category: result,
          logs: new Date(),
        },
      ]);
    } else if (type === "BMR") {
      let bmr: number = 0;
      let exercise: Array<number> = [];

      if (data.gender === "male") {
        bmr = 66 + 13.7 * weight + 5 * height - 6.8 * data.age;
      } else if (data.gender === "female") {
        bmr = 655 + 9.6 * weight + 1.8 * height - 4.7 * data.age;
      }
      exercise.push(Math.round((bmr * 1.2 + Number.EPSILON) * 100) / 100);
      exercise.push(Math.round((bmr * 1.375 + Number.EPSILON) * 100) / 100);
      exercise.push(Math.round((bmr * 1.55 + Number.EPSILON) * 100) / 100);
      exercise.push(Math.round((bmr * 1.725 + Number.EPSILON) * 100) / 100);
      exercise.push(Math.round((bmr * 1.9 + Number.EPSILON) * 100) / 100);

      setLogsBMR([
        ...logsBMR,
        {
          age: data.age,
          gender: data.gender,
          height: `${data.height} ${calcUnits === "cmkg" ? "cm" : "ft"}`,
          weight: `${data.weight} ${calcUnits === "cmkg" ? "kg" : "lbs"}`,
          bmr: bmr,
          exercise: exercise,
          logs: new Date(),
        },
      ]);
    }
  };

  return (
    <>
      <form ref={formBMI}>
        <IonGrid className="ion-text-center ion-margin">
          <IonRow>
            <IonCol>
              <InputControls selectedValue={calcUnits} handleControl={setCalcUnits} />
            </IonCol>
          </IonRow>
          {type === "BMR" && (
            <>
              <IonRow>
                <IonCol>
                  <IonItem>
                    <IonLabel position="floating">Age</IonLabel>
                    <IonInput
                      type="number"
                      {...register("age", {
                        required: {
                          value: true,
                          message: "Age is required",
                        },
                        min: {
                          value: 0,
                          message: "Age must be greater than 0",
                        },
                      })}
                    />
                  </IonItem>
                  {errors.age && <IonText className="label label-danger ion-float-left">{errors.age.message}</IonText>}
                </IonCol>
              </IonRow>
              <IonRow>
                <IonCol>
                  <IonRow>
                    <IonLabel>Gender</IonLabel>
                  </IonRow>
                  <Controller
                    control={control}
                    name="gender"
                    rules={{
                      required: {
                        value: true,
                        message: "Gender is required",
                      },
                    }}
                    render={({ field: { onChange, value } }) => (
                      <IonRadioGroup value={value} onIonChange={({ detail: { value } }) => onChange(value)}>
                        <IonRow>
                          <IonCol>
                            <IonItem>
                              <IonRadio value="male" />
                              <IonLabel style={{ marginLeft: "0.8rem" }}>Male</IonLabel>
                            </IonItem>
                          </IonCol>
                          <IonCol>
                            <IonItem>
                              <IonRadio value="female" />
                              <IonLabel style={{ marginLeft: "0.8rem" }}>Female</IonLabel>
                            </IonItem>
                          </IonCol>
                        </IonRow>
                      </IonRadioGroup>
                    )}
                  />
                  {errors.gender && <IonText className="label label-danger ion-float-left">{errors.gender.message}</IonText>}
                </IonCol>
              </IonRow>
            </>
          )}
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Height ({calcUnits == "cmkg" ? "cm" : "ft"})</IonLabel>
                <IonInput
                  type="number"
                  {...register("height", {
                    required: {
                      value: true,
                      message: "Height is required",
                    },
                    min: {
                      value: 1,
                      message: "Height must be greater than 0",
                    },
                  })}
                />
              </IonItem>
              {errors.height && <IonText className="label label-danger ion-float-left">{errors.height.message}</IonText>}
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="floating">Your Weight ({calcUnits == "cmkg" ? "kg" : "lbs"})</IonLabel>
                <IonInput
                  type="number"
                  {...register("weight", {
                    required: {
                      value: true,
                      message: "Weight is required",
                    },
                    min: {
                      value: 1,
                      message: "Weight must be greater than 0",
                    },
                  })}
                />
              </IonItem>
              {errors.weight && <IonText className="label label-danger ion-float-left">{errors.weight.message}</IonText>}
            </IonCol>
          </IonRow>
          <BMIControls onCalculate={handleSubmit(handleSubmitForm)} onReset={handleResetForm} />
          <IonRow>
            <IonCol>
              <ResultCard type={type} data={type === "BMI" ? logsBMI[logsBMI.length - 1] : logsBMR[logsBMR.length - 1]} />
            </IonCol>
          </IonRow>
        </IonGrid>
      </form>
      <h3 className="ion-text-center">{type} Logs</h3>
      <IonGrid>
        <IonRow>
          <IonCol>
            {type === "BMI"
              ? logsBMI?.map((item) => <LogsCard data={item} type="BMI" />)
              : type === "BMR" && logsBMR?.map((item) => <LogsCard data={item} type="BMR" />)}
          </IonCol>
        </IonRow>
      </IonGrid>
    </>
  );
};

export default Calculator;
