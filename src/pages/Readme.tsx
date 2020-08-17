import {
    IonButtons,
    IonContent, IonHeader,
    IonPage,

    IonTitle, IonToolbar
} from "@ionic/react";
import React from "react";
import { Logo } from "src/components/Logo";

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
                <h2>Built with Ionic React</h2>
                <p>
                    <b>
                        Disclaimer: This app is only for demostration purpuses.
          </b>
                </p>
                <p>
                    For More Information Contact me at <a
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
