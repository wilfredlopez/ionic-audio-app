import {
    IonBackButton,
    IonButtons,



    IonContent, IonHeader,



    IonModal, IonTitle, IonToolbar
} from "@ionic/react";
import React from "react";
import { Song } from "src/appState/State";

interface TrackProps {
    track: Song
}

const Track = ({ track }: TrackProps) => {
    return (
        <IonModal isOpen={true}>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>
                    <IonTitle>{track.title}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <p>Details</p>
            </IonContent>
        </IonModal>
    );
};

export default Track;
