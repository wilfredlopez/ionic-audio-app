import {
    IonButtons,
    IonCol,
    IonContent, IonGrid, IonHeader,
    IonPage,
    IonRow,
    IonTitle, IonToolbar
} from "@ionic/react";
import React from "react";
import { Logo } from "src/components/Logo";
import { APP_TITLE, CONTACT_EMAIL } from "src/constants";

const Readme = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>

                    <IonButtons slot="start">
                        <Logo />
                    </IonButtons>
                    <IonTitle>About</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <IonGrid>
                    <IonRow>
                        <IonCol size="12">
                            <IonTitle className="flex-center" >
                                {APP_TITLE}
                            </IonTitle>
                        </IonCol>
                    </IonRow>
                    <IonRow>
                        <IonCol sizeXs={'12'}>
                            <div className="flex-center">

                                <Logo width={100} fill="var(--ion-color-primary, red)" />
                            </div>
                        </IonCol>
                    </IonRow>

                </IonGrid>
                <p>
                    <b>
                        Disclaimer:{" "}

                    </b>This app is only for demostration purpuses.
                </p>
                <p>
                    <b>

                        Privacy Policy:{" "}
                    </b>
                All music files and web images are used in order to promote and sponsor This blog does not support piracy since everything is for promotional use. {APP_TITLE} is not responsible for the publications of our editors.
                </p>
                <p>
                    For More Information Contact me at {CONTACT_EMAIL} or visit <a
                        href="https://wilfredlopez.net"
                        target="_blank"
                        rel="noopener noreferrer"
                    >wilfredlopez.net</a>
                </p>

            </IonContent>
        </IonPage>
    );
};

export default Readme;
