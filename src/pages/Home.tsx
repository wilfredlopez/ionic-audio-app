import {
    IonButtons,
    IonCol, IonContent,
    IonGrid, IonHeader,
    IonItem,
    IonLabel, IonList,
    IonListHeader, IonPage,
    IonRow, IonThumbnail, IonTitle, IonToolbar
} from "@ionic/react";
import React, { useCallback } from "react";
import { useAppState } from "src/appState/AppContextProvider";
import { ContentGrid } from "src/components/ContentGrid";
import { APP_TITLE } from "src/constants";

import { getHotTracks, getNewTracks, ActionCreators } from "../appState/State";
import { img } from "../utils/util";

import "./Home.css";
import { Logo } from "src/components/Logo";

const Home = () => {
    const [state, dispatch] = useAppState()

    const hotTracks = getHotTracks(state);
    const newTracks = getNewTracks(state);

    const doPlay = useCallback((track) => {
        dispatch(ActionCreators.playTrack(track));
    }, [dispatch]);



    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonButtons slot="start">

                        <Logo />
                    </IonButtons>
                    <IonTitle>{APP_TITLE}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <ContentGrid>

                    <IonList>
                        <IonListHeader>
                            <IonLabel>Hot Tracks</IonLabel>
                        </IonListHeader>
                        {hotTracks.map((track) => (
                            <IonItem key={track.id + '-hottracks'} onClick={() => doPlay(track)} button>
                                <IonThumbnail slot="start">
                                    <img src={img(track.imageUrl)} alt={track.title} />
                                </IonThumbnail>
                                <IonLabel>
                                    <h2>{track.title}</h2>
                                    <p>{track.artist}</p>
                                </IonLabel>
                            </IonItem>
                        ))}
                    </IonList>

                    <IonList>
                        <IonListHeader>
                            <IonLabel>New Music</IonLabel>
                        </IonListHeader>
                        <IonGrid>
                            <IonRow>
                                {newTracks.map((track) => (
                                    <IonCol
                                        size={'6'}
                                        className="new-track"
                                        key={track.id + "-NewTracks"}
                                        onClick={() => doPlay(track)}
                                    >
                                        <img src={track.imageUrl} alt={track.title} />
                                        <IonItem lines="none">
                                            <IonLabel>
                                                <h3>{track.title}</h3>
                                                <p>{track.artist}</p>
                                            </IonLabel>
                                        </IonItem>
                                    </IonCol>
                                ))}
                            </IonRow>
                        </IonGrid>
                    </IonList>

                </ContentGrid>
            </IonContent>
        </IonPage>
    );
};

export default Home;
