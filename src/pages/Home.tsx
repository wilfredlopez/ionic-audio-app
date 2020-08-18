import {
    IonButtons,
    IonContent,
    IonGrid, IonHeader,
    IonLabel, IonList,
    IonListHeader, IonPage,
    IonRow, IonTitle, IonToolbar
} from "@ionic/react";
import React, { useCallback } from "react";
import { useAppState } from "src/appState/AppContextProvider";
import { ContentGrid } from "src/components/ContentGrid";
import HotTrack from "src/components/HotTrack";
import { Logo } from "src/components/Logo";
import NewTrack from "src/components/NewTrack";
import { APP_TITLE } from "src/constants";
import { ActionCreators, getHotTracks, getNewTracks } from "../appState/State";
import "./Home.css";



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
                            <HotTrack key={track.id + '-hottracks'}
                                track={track}
                                handlePlay={doPlay} />
                        ))}
                    </IonList>

                    <IonList>
                        <IonListHeader>
                            <IonLabel>New Music</IonLabel>
                        </IonListHeader>
                        <IonGrid>
                            <IonRow>
                                {newTracks.map((track) => (
                                    <NewTrack
                                        key={track.id + "-NewTracks"}
                                        track={track}
                                        handlePlay={doPlay}
                                    />

                                ))}
                            </IonRow>
                        </IonGrid>
                    </IonList>

                </ContentGrid>
            </IonContent>
        </IonPage>
    );
};

export default React.memo(Home);
