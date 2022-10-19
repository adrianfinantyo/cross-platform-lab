import { IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel, IonBadge } from "@ionic/react";
import { tabNavProps, tabItemTypes } from "../types/type";

export const TabNav: React.FC<tabNavProps> = (props: tabNavProps) => {
  return (
    <IonTabs>
      {props.children}
      <IonTabBar slot="bottom">
        {props.tabItem?.map((tabItem: tabItemTypes) => (
          <IonTabButton tab={tabItem.tabLabel} href={tabItem.href} key={tabItem.tabLabel}>
            <IonIcon icon={tabItem.tabIcon} />
            <IonLabel>{tabItem.tabLabel}</IonLabel>
            {tabItem.tabBadge && <IonBadge>{tabItem.tabBadge}</IonBadge>}
          </IonTabButton>
        ))}
      </IonTabBar>
    </IonTabs>
  );
};
