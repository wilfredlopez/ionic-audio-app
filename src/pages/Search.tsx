import { SearchbarChangeEventDetail } from "@ionic/core";
import {
    IonContent,
    IonHeader,
    IonItem,
    IonLabel,
    IonPage,
    IonSearchbar,
    IonThumbnail,
    IonTitle,
    IonToolbar,
    useIonViewDidEnter
} from "@ionic/react";
import React, { useCallback, useContext, useRef, useState } from "react";
import { search } from "../search";
import { AppContext, ITrack, ActionCreators } from "../State";
import { img } from "../util";




const Search = () => {
    const state = useContext(AppContext);
    const dispatch = state.dispatch
    // const [isSearching, setIsSearching] = useState(false);
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const searchbarRef = useRef<HTMLIonSearchbarElement>(null);

    const doSearch = useCallback(async (e: CustomEvent<SearchbarChangeEventDetail>) => {
        //@ts-ignore
        const q = e.target?.value as any || "";

        if (!q)
        {
            setTracks([]);
            return;
        }

        setTracks(await search(q, state));
    }, [state]);

    const doPlay = useCallback((track) => {
        dispatch(ActionCreators.playTrack(track));
    }, [dispatch]);

    // Use this pattern to focus a search box whenever the
    // page enters from a navigation event
    useIonViewDidEnter(() => {
        searchbarRef.current!.setFocus();
    });

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Search</IonTitle>
                </IonToolbar>
                <IonToolbar>
                    <IonSearchbar color="primary" ref={searchbarRef} onIonChange={doSearch} />
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {tracks.map((track) => (
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
            </IonContent>
        </IonPage>
    );
};

export default Search;
