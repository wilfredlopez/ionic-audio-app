import {
    IonContent, IonHeader,
    IonPage,

    IonTitle, IonToolbar
} from "@ionic/react";
import React from "react";

const Readme = () => {
    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Readme</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h2>Built with Ionic React</h2>
                <p>
                    <b>
                        Disclaimer: this app does not actually play audio (due to licensing
                        and lack of public APIs reasons)
          </b>
                </p>

            </IonContent>
        </IonPage>
    );
};

export default Readme;
