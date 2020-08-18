import {
    IonButton,
    IonButtons,
    IonCol,
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
import { getHotTracks, getNewTracks } from "../appState/State";
import "./Home.css";

import { useGetAllSongsLazyQuery } from "src/hooks/useGetSongsQuery";


const Home = () => {
    const [state, dispatch, ActionCreators] = useAppState()

    const hotTracks = getHotTracks(state);
    const newTracks = getNewTracks(state);
    const [loadMoreSongs, { loading }] = useGetAllSongsLazyQuery({
        onCompleted: ({ getAllSongs }) => {
            if (getAllSongs.songs)
            {
                dispatch(ActionCreators.addSongsIfNotExist(getAllSongs.songs))
            }
        }
    })
    const doPlay = useCallback((track) => {
        dispatch(ActionCreators.playTrack(track));
    }, [dispatch, ActionCreators]);

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
                    <IonGrid >
                        <IonRow className="ion-justify-content-center">
                            <IonCol size="auto" >
                                <IonButton
                                    shape="round"
                                    fill="outline"
                                    disabled={loading}
                                    onClick={() => {
                                        loadMoreSongs({
                                            variables: {
                                                limit: state.music.tracks.length + 20,
                                                skip: state.music.tracks.length - 1
                                            }
                                        })
                                    }}
                                >
                                    Load More
                                    </IonButton>

                            </IonCol>
                        </IonRow>
                    </IonGrid>

                </ContentGrid>
            </IonContent>
        </IonPage>
    );
};

export default React.memo(Home);
