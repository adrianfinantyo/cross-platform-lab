import { Redirect, Route, Switch } from "react-router-dom";
import {
  IonApp,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import * as Page from "./pages";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";
import "./App.css";
import { useEffect, useState } from "react";
import { GlobalContext } from "./GlobalContext";
import { sunny, moon } from "ionicons/icons";

setupIonicReact();

const App: React.FC = () => {
  const [title, setTitle] = useState<string>("Calculator");
  const [darkMode, setDarkMode] = useState<boolean>(window.matchMedia("(prefers-color-scheme: dark)").matches);

  const globalContextValue = {
    title,
    setTitle,
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <IonApp>
        <IonReactRouter>
          <IonPage>
            <IonHeader>
              <IonToolbar style={{ padding: "0.5rem 2rem" }} color="primary">
                <IonButtons slot="start">
                  <IonBackButton defaultHref="/" />
                </IonButtons>
                <IonTitle>{title}</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={() => setDarkMode(!darkMode)}>
                    <IonIcon slot="icon-only" icon={darkMode ? moon : sunny} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <Switch>
                <Route path="/bmi-calculator" exact render={() => <Page.Calculator type="BMI" />} />
                <Route path="/bmr-calculator" exact render={() => <Page.Calculator type="BMR" />} />
                <Route path="/" component={Page.Home} exact />
                <Route path="/*" render={() => <Redirect to="/" />} />
              </Switch>
            </IonContent>
          </IonPage>
        </IonReactRouter>
      </IonApp>
    </GlobalContext.Provider>
  );
};

export default App;
