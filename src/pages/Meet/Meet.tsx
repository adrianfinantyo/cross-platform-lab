import {
  IonAvatar,
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonFab,
  IonFabButton,
  IonGrid,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonItemOption,
  IonItemOptions,
  IonItemSliding,
  IonLabel,
  IonList,
  IonModal,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
  useIonModal,
  useIonToast,
} from "@ionic/react";
import { addOutline, ban, create, trash } from "ionicons/icons";
import { useContext, useEffect, useRef, useState } from "react";
import { GlobalContext } from "../../GlobalContext";
import { getContact } from "../../services/service";
import { contactResApi } from "../../types/type";
import "./Meet.css";

const AddFriendModal = ({ onDismiss }: { onDismiss: (data?: string | null | undefined | number, role?: string) => void }) => {
  const { contact } = useContext(GlobalContext);
  const inputName = useRef<HTMLIonInputElement>(null);
  const inputEmail = useRef<HTMLIonInputElement>(null);
  const [presentToast] = useIonToast();

  const handleAddFriend = () => {
    const name = inputName.current?.value;
    const email = inputEmail.current?.value;
    if (name && email) {
      const newContact = {
        name,
        email,
        avatar:
          "https://res.cloudinary.com/practicaldev/image/fetch/s--i96Gcbyf--/c_fill,f_auto,fl_progressive,h_320,q_auto,w_320/https://thepracticaldev.s3.amazonaws.com/uploads/user/profile_image/50592/f46e43c2-f4f0-4787-b34e-a310cecc221a.jpg",
      };
      contact.set([...contact.data, newContact]);
      onDismiss();
    } else {
      presentToast({
        message: "Please fill all the fields",
        duration: 2000,
        color: "danger",
      });
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Add Friend</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonGrid>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Friend Name</IonLabel>
                <IonInput ref={inputName} name="name" />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonItem>
                <IonLabel position="stacked">Email</IonLabel>
                <IonInput ref={inputEmail} name="email" />
              </IonItem>
            </IonCol>
          </IonRow>
          <IonRow>
            <IonCol>
              <IonButton expand="block" color="light" onClick={() => onDismiss()}>
                Cancel
              </IonButton>
            </IonCol>
            <IonCol>
              <IonButton expand="block" color="primary" onClick={() => handleAddFriend()}>
                Add
              </IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

const Meet: React.FC = () => {
  const { setTitle, contact } = useContext(GlobalContext);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [presentAlert] = useIonAlert();
  const [presentToast] = useIonToast();
  const [presentModal, dismissModal] = useIonModal(AddFriendModal, {
    onDismiss: (data: string, role: string) => {
      setShowModal(false);
      dismissModal(data, role);
    },
  });

  const fetchContact = async () => {
    const res = await getContact();
    contact.set(res);
  };

  useEffect(() => {
    setTitle("Meet");
    fetchContact();
  }, []);

  useEffect(() => {
    if (showModal) {
      presentModal();
    }
  }, [showModal]);

  const handleCall = (name: string) => {
    console.log(`Calling ${name}...`);
  };

  const handleEdit = () => {
    console.log("Editing...");
    setShowModal(true);
  };

  const handleDelete = (name: string) => {
    presentAlert({
      header: "Delete Contact",
      message: `Are you sure you want to delete ${name}?`,
      buttons: [
        "Cancel",
        {
          text: "Delete",
          handler: () => {
            contact.set(contact.data.filter((item: contactResApi) => item.name !== name));
            presentToast({
              color: "success",
              message: `${name} has been deleted.`,
              duration: 2000,
            });
          },
        },
      ],
    });
  };

  const handleBlock = (name: string) => {
    presentAlert({
      header: "Block Contact",
      message: `Are you sure you want to block ${name}?`,
      buttons: [
        "Cancel",
        {
          text: "Block",
          handler: () => {
            contact.set(contact.data.filter((item: contactResApi) => item.name !== name));
            presentToast({
              color: "success",
              message: `${name} has been blocked.`,
              duration: 2000,
            });
          },
        },
      ],
    });
  };

  return (
    <>
      <IonFab vertical="bottom" horizontal="end" slot="fixed">
        <IonFabButton color="secondary" onClick={() => setShowModal(!showModal)}>
          <IonIcon icon={addOutline} />
        </IonFabButton>
      </IonFab>
      {/* Page Content */}
      <IonList className="meet">
        {contact.data.map((item: contactResApi) => (
          <IonItemSliding key={item.name}>
            <IonItemOptions side="start">
              <IonItemOption color="danger" onClick={() => handleBlock(item.name)}>
                <IonIcon slot="icon-only" icon={ban} />
              </IonItemOption>
              <IonItemOption color="warning" onClick={() => handleDelete(item.name)}>
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
    </>
  );
};

export default Meet;
