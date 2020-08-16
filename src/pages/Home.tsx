import {
    IonCol, IonContent,
    IonGrid, IonHeader,
    IonItem,
    IonLabel, IonList,
    IonListHeader, IonPage,
    IonRow, IonThumbnail, IonTitle, IonToolbar
} from "@ionic/react";
import React, { useCallback, useContext } from "react";
import { APP_TITLE } from "src/constants";
import { AppContext, getHotTracks, getNewTracks, ActionCreators } from "../State";
import { img } from "../util";
import "./Home.css";

const Home = () => {
    const state = useContext(AppContext);
    const dispatch = state.dispatch

    const hotTracks = getHotTracks(state);
    const newTracks = getNewTracks(state);

    const doPlay = useCallback((track) => {
        dispatch(ActionCreators.playTrack(track));
    }, [dispatch]);

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>{APP_TITLE}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                <IonList>
                    <IonListHeader>
                        <IonLabel>Hot Tracks</IonLabel>
                    </IonListHeader>
                    {hotTracks.map((track) => (
                        <IonItem key={track.title} onClick={() => doPlay(track)} button>
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
                                    key={track.title}
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
            </IonContent>
        </IonPage>
    );
};

export default Home;
