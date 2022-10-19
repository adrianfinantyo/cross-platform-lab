import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonCol, IonGrid, IonRow, IonText } from "@ionic/react";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { getMail } from "../../services/service";
import { mailResApi } from "../../types/type";
import "./Mail.css";

const Mail: React.FC = () => {
  const { setTitle } = useContext(GlobalContext);
  const [mail, setMail] = useState<mailResApi[]>([]);

  const fetchMail = async () => {
    const res = await getMail();
    setMail(res);
  };

  useEffect(() => {
    setTitle("Ionic Mail");
    fetchMail();
  }, []);

  return (
    <IonGrid>
      <IonRow>
        <IonCol size-sm="8" offset-sm="2" size-md="6" offset-md="3">
          <IonGrid>
            <IonRow>
              <IonCol>
                {mail.map((item) => (
                  <IonCard className="email-card" key={`${item.date}-${item.subject}`}>
                    <IonCardHeader>
                      <IonCardSubtitle>From: {item.from}</IonCardSubtitle>
                      <IonCardTitle>{item.subject}</IonCardTitle>
                    </IonCardHeader>
                    <IonCardContent>
                      <IonText>
                        <p>{item.message.length > 150 ? item.message.slice(0, 150) + "..." : item.message}</p>
                      </IonText>
                      <IonButton expand="block">View Email</IonButton>
                    </IonCardContent>
                  </IonCard>
                ))}
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonCol>
      </IonRow>
    </IonGrid>
  );
};

export default Mail;
