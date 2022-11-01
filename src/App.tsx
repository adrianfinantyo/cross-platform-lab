import { Redirect, Route, Switch, useLocation } from "react-router-dom";
import {
  IonApp,
  IonBackButton,
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuButton,
  IonMenuToggle,
  IonPage,
  IonRouterOutlet,
  IonTitle,
  IonToolbar,
  isPlatform,
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
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "./context/GlobalContext";
import { sunny, moon, videocam, mail, list, warningOutline, settings, happyOutline, sadOutline, happy, sad, add } from "ionicons/icons";
import { TabNav } from "./components/TabNav";
import { tabItemTypes } from "./types/type";
import { MemoryContext } from "./context/MemoryContext";

setupIonicReact();

const App: React.FC = () => {
  const [title, setTitle] = useState<string>("Memories App");
  const [darkMode, setDarkMode] = useState<boolean>(window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [iosAddButton, setIosAddButton] = useState<boolean>(false);
  const [themeButton, setThemeButton] = useState<boolean>(true);
  const [showBackBtn, setShowBackBtn] = useState<boolean>(false);
  const { initContext } = useContext(MemoryContext);

  const globalContextValue = {
    title: {
      value: title,
      set: setTitle,
    },
    darkMode: {
      value: darkMode,
      set: (value: boolean) => setDarkMode(value),
      toggle: () => setDarkMode(!darkMode),
    },
    backButton: {
      value: showBackBtn,
      set: (value: boolean) => setShowBackBtn(value),
      toggle: () => setShowBackBtn(!showBackBtn),
    },
    iosAddButton: {
      value: iosAddButton,
      set: (value: boolean) => setIosAddButton(value),
      toggle: () => setIosAddButton(!iosAddButton),
    },
    themeButton: {
      value: themeButton,
      set: (value: boolean) => setThemeButton(value),
      toggle: () => setThemeButton(!themeButton),
    },
  };

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    initContext();
  }, []);

  return (
    <GlobalContext.Provider value={globalContextValue}>
      <IonApp>
        <IonReactRouter>
          <IonPage>
            <IonHeader>
              <IonToolbar style={{ padding: "0.5rem" }} color="primary">
                {showBackBtn ? (
                  <IonButtons slot="start">
                    <IonBackButton defaultHref="/memories" />
                  </IonButtons>
                ) : (
                  isPlatform("ios") && (
                    <IonButton slot="start" onClick={() => setDarkMode(!darkMode)}>
                      <IonIcon slot="icon-only" icon={darkMode ? moon : sunny} />
                    </IonButton>
                  )
                )}
                <IonTitle>{title}</IonTitle>
                <IonButtons slot="end">
                  {isPlatform("ios") && iosAddButton ? (
                    <IonButton routerLink="/new-memories">
                      <IonIcon slot="icon-only" icon={add} />
                    </IonButton>
                  ) : (
                    themeButton && (
                      <IonButton onClick={() => setDarkMode(!darkMode)}>
                        <IonIcon slot="icon-only" icon={darkMode ? moon : sunny} />
                      </IonButton>
                    )
                  )}
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <IonRouterOutlet>
              <IonContent className="app-container ion-padding">
                <Switch>
                  <Route path="/new-memories" exact component={Page.NewMemories} />
                  <Route path="/memories/:path1?" exact>
                    <TabNav tabItem={tabItem}>
                      <IonRouterOutlet>
                        <IonContent className="app-container ion-padding">
                          <Route path="/memories/:type" component={Page.Memories} />
                          <Redirect exact from="/memories" to="/memories/good" />
                        </IonContent>
                      </IonRouterOutlet>
                    </TabNav>
                  </Route>
                  <Redirect exact from="/*" to="/memories" />
                </Switch>
              </IonContent>
            </IonRouterOutlet>
          </IonPage>
        </IonReactRouter>
      </IonApp>
    </GlobalContext.Provider>
  );
};

export default App;

const tabItem: tabItemTypes[] = [
  {
    href: "/memories/good",
    tabIcon: happy,
    tabLabel: "Good Memories",
  },
  {
    href: "/memories/bad",
    tabIcon: sad,
    tabLabel: "Bad Memories",
  },
];
