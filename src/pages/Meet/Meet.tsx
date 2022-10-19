import {
  IonAvatar,
  IonButton,
  IonCol,
  IonGrid,
  IonIcon,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonRow,
  IonText,
} from "@ionic/react";
import { ban, create, trash } from "ionicons/icons";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { getContact } from "../../services/service";
import { contactResApi } from "../../types/type";
import "./Meet.css";

const Meet: React.FC = () => {
  const { setTitle } = useContext(GlobalContext);
  const [contact, setContact] = useState<contactResApi[]>([]);

  const fetchContact = async () => {
    const res = await getContact();
    setContact(res);
  };

  useEffect(() => {
    setTitle("Meet");
    fetchContact();
  }, []);

  const handleCall = (name: string) => {
    console.log(`Calling ${name}...`);
  };

  const handleEdit = () => {
    console.log("Editing...");
  };

  const handleDelete = () => {
    console.log("Deleting...");
  };

  const handleBlock = () => {
    console.log("Blocking...");
  };

  return (
    <IonList className="meet">
      {contact.map((item) => (
        <IonItemSliding key={item.name}>
          <IonItemOptions side="start">
            <IonItemOption color="danger" onClick={handleBlock}>
              <IonIcon slot="icon-only" icon={ban} />
            </IonItemOption>
            <IonItemOption color="warning" onClick={handleDelete}>
              <IonIcon slot="icon-only" icon={trash} />
            </IonItemOption>
          </IonItemOptions>
          <IonItemOptions side="end">
            <IonItemOption color="warning" onClick={handleEdit}>
              <IonIcon slot="icon-only" icon={create} />
            </IonItemOption>
          </IonItemOptions>
          <IonItem
            lines="full"
            button
            onClick={() => {
              handleCall(item.name);
            }}
          >
            <IonAvatar slot="start">
              <img className="avatar" src={item.avatar} alt={`${item.name}'s avatar`} />
            </IonAvatar>
            <IonText>{item.name}</IonText>
          </IonItem>
        </IonItemSliding>
      ))}
    </IonList>
  );
};

export default Meet;
