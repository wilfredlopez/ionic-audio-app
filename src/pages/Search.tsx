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
import { useSearchSongsLazyQuery } from "src/hooks/useSearchSongsQuery";
// import { search } from "../search";
import { AppContext, ITrack, ActionCreators } from "../State";
import { img, debounce } from "../util";




const Search = () => {
    const state = useContext(AppContext);
    const dispatch = state.dispatch

    // const [isSearching, setIsSearching] = useState(false);
    const [tracks, setTracks] = useState<ITrack[]>([]);
    const searchbarRef = useRef<HTMLIonSearchbarElement>(null);


    const [searchSongs] = useSearchSongsLazyQuery({
        onCompleted: (completeQuery) => {
            if (completeQuery.searchSongs.songs)
            {
                // ActionCreators.addSongsIfNotExist(completeQuery.searchSongs.songs as ITrack[])
                setTracks(completeQuery.searchSongs.songs as ITrack[])
            }
        }
    })

    const doSearch = useCallback(async (e: CustomEvent<SearchbarChangeEventDetail>) => {

        const delayedQuery = debounce(function (query: string) {
            searchSongs({
                variables: {
                    query: query,
                }
            })
            //setTracks(await search(q, state));
        }, 500);

        //@ts-ignore
        const q = e.target?.value as string || "";

        if (!q)
        {
            setTracks([]);
            return;
        }
        delayedQuery(q)
    }, [searchSongs
        // state
    ]);

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
                    <IonItem key={track.id + '-tracks'} onClick={() => doPlay(track)} button>
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
