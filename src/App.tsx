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
import { sunny, moon, videocam, mail, list, warningOutline, settings } from "ionicons/icons";
import { TabNav } from "./components/TabNav";
import { contactResApi, tabItemTypes } from "./types/type";

setupIonicReact();

const App: React.FC = () => {
  const [title, setTitle] = useState<string>("Calculator");
  const [darkMode, setDarkMode] = useState<boolean>(window.matchMedia("(prefers-color-scheme: dark)").matches);
  const [displayMenu, setDisplayMenu] = useState<boolean>(true);
  const [contact, setContact] = useState<contactResApi[]>([]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => setDisplayMenu(!displayMenu);

  const globalContextValue = {
    title,
    setTitle,
    menuButton: {
      isDisplayed: displayMenu,
      toggle: toggleMenu,
    },
    contact: {
      data: contact,
      set: setContact,
    },
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
          <IonMenu contentId="main-content" type="overlay">
            <IonHeader>
              <IonToolbar>
                <IonTitle>IonMail</IonTitle>
              </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
              <IonList>
                {menuItem.map((menu) => (
                  <IonMenuToggle key={menu.tabLabel}>
                    <IonItem button routerLink={menu.href}>
                      <IonIcon slot="start" icon={menu.tabIcon} />
                      <IonLabel>{menu.tabLabel}</IonLabel>
                    </IonItem>
                  </IonMenuToggle>
                ))}
              </IonList>
            </IonContent>
          </IonMenu>
          <IonPage id="main-content">
            <IonHeader>
              <IonToolbar style={{ padding: "0.5rem 2rem" }} color="primary">
                <IonButtons slot="start">{displayMenu ? <IonMenuButton></IonMenuButton> : <IonBackButton defaultHref="/" />}</IonButtons>
                <IonTitle>{title}</IonTitle>
                <IonButtons slot="end">
                  <IonButton onClick={toggleDarkMode}>
                    <IonIcon slot="icon-only" icon={darkMode ? moon : sunny} />
                  </IonButton>
                </IonButtons>
              </IonToolbar>
            </IonHeader>
            <TabNav tabItem={tabItem}>
              <IonRouterOutlet>
                <IonContent className="app-container">
                  <Switch>
                    <Route path="/mail" component={Page.Mail} exact />
                    <Route path="/meet" component={Page.Meet} exact />
                    <Route path="/mail/spam" component={Page.Spam} exact />
                    <Route path="/settings" component={Page.Settings} exact />
                    <Route path="/*" render={() => <Redirect to="/mail" />} />
                  </Switch>
                </IonContent>
              </IonRouterOutlet>
            </TabNav>
          </IonPage>
        </IonReactRouter>
      </IonApp>
    </GlobalContext.Provider>
  );
};

export default App;

const tabItem: tabItemTypes[] = [
  {
    href: "/mail",
    tabIcon: mail,
    tabLabel: "Mail",
  },
  {
    href: "/meet",
    tabIcon: videocam,
    tabLabel: "Meet",
  },
];

const menuItem: tabItemTypes[] = [
  {
    href: "/mail",
    tabIcon: mail,
    tabLabel: "All Mail",
  },
  {
    href: "/mail/spam",
    tabIcon: warningOutline,
    tabLabel: "Spam",
  },
  {
    href: "/settings",
    tabIcon: settings,
    tabLabel: "Settings",
  },
];
