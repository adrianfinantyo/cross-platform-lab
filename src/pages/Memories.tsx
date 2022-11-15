import { IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonCol, IonFab, IonFabButton, IonGrid, IonIcon, IonImg, IonRow, isPlatform } from "@ionic/react";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import { add } from "ionicons/icons";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../context/GlobalContext";
// import { MemoryContext } from "../context/MemoryContext";
import { APP_CONFIG, getAllMemories } from "../services/service";
import { Memory } from "../types/type";
import "./Memories.css";

const mapOptions = {
  disableDefaultUI: true,
  gestureHandling: "none",
  zoomControl: false,
  zoom: 16,
};

const Memories: React.FC = () => {
  // const { memories } = useContext(MemoryContext);
  const { backButton, iosAddButton, themeButton } = useContext(GlobalContext);
  const { type } = useParams<{ type: "good" | "bad" }>();
  const [filteredMemories, setFilteredMemories] = useState<Memory[]>([]);
  // const filteredMemories = memories.filter((memory) => memory.type.toLowerCase() === type.toLowerCase());

  const fetchMemories = async () => {
    try {
      const res = await getAllMemories(type);
      res.memories.forEach((memories: any) => {
        try {
          memories.position = JSON.parse(memories.position);
        } catch (err) {
          memories.position = { lat: 0, lng: 0 };
        }
      });
      setFilteredMemories(res.memories);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    backButton.set(false);
    iosAddButton.set(true);
    themeButton.set(true);
  }, []);

  useEffect(() => {
    fetchMemories();
  }, [type]);

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
                <IonCard className="memories-item">
                  <IonImg className="item-img" src={`${APP_CONFIG.baseUrl}/${memory.photo}`} alt={memory.title} />
                  <LoadScript googleMapsApiKey={APP_CONFIG.googleApiKey}>
                    <GoogleMap mapContainerStyle={{ width: "100%", height: "50vh" }} center={memory.position} options={mapOptions}>
                      <Marker position={memory.position} />
                    </GoogleMap>
                  </LoadScript>
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
              <IonCard className="ion-padding">
                <h2>No memories found</h2>
              </IonCard>
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
