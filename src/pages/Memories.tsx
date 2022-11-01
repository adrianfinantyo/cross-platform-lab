import { IonCard, IonCardHeader, IonCardTitle, IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonRow, isPlatform } from "@ionic/react";
import { add } from "ionicons/icons";
import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
import { MemoryContext } from "../context/MemoryContext";

const Memories: React.FC = () => {
  const { memories } = useContext(MemoryContext);
  const { backButton, iosAddButton, themeButton } = useContext(GlobalContext);
  const { type } = useParams<{ type: string }>();
  const filteredMemories = memories.filter((memory) => memory.type.toLowerCase() === type.toLowerCase());
  console.log(filteredMemories);

  useEffect(() => {
    backButton.set(false);
    iosAddButton.set(true);
    themeButton.set(true);
  }, []);

  return (
    <>
      <IonGrid>
        <IonRow>
          <IonCol>
            <h1 className="ion-text-capitalize">{type} Memories</h1>
          </IonCol>
        </IonRow>
        {filteredMemories.length > 0 ? (
          filteredMemories.map((memory) => (
            <IonRow key={memory.id}>
              <IonCol>
                <IonCard>
                  <IonImg src={memory.base64Url} alt={memory.title} />
                  <IonCardHeader>
                    <IonCardTitle>{memory.title}</IonCardTitle>
                  </IonCardHeader>
                </IonCard>
              </IonCol>
            </IonRow>
          ))
        ) : (
          <IonRow className="ion-text-center">
            <IonCol>
              <h2>No memories found</h2>
            </IonCol>
          </IonRow>
        )}
      </IonGrid>
      {!isPlatform("ios") && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton href="/new-memories">
            <IonIcon icon={add} />
          </IonFabButton>
        </IonFab>
      )}
    </>
  );
};

export default Memories;
