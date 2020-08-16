import React, { useCallback, useContext } from "react";

import {
    IonModal,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonRange,
    IonButtons,
    IonButton,
    IonIcon,
} from "@ionic/react";

import {
    arrowDown,
    heart,
    heartOutline,
    playSkipBack,
    play,
    pause,
    playSkipForward,
    removeCircleOutline,
} from "ionicons/icons";

import {
    AppContext,
    isPlayerOpen,
    ActionCreators,
    getPlaying,
    getCurrentTrack,
    isFavTrack,
    ITrack, PlayingState
} from "../State";

import { img, msToTime } from "../util";

import "./TrackPlayer.css";

interface TrackProgressProps {
    playing: PlayingState
    track: ITrack,
    onSeek: (time: number) => void
}

const TrackProgress = ({ playing, track, onSeek }: TrackProgressProps) => {
    const progress = playing.progress;
    const left = track.time - (progress || 0);
    const percent = ((progress || 0) / track.time) * 100;

    const s = (p: number) => {
        const newTime = (p / 100) * track.time;
        onSeek(newTime);
    };
    return (
        <div className="track-progress">
            <IonRange
                value={percent}
                onIonChange={(e: any) => {
                    s(e.target.value as any);
                }}
            />
            <div className="track-progress-time">
                <div className="track-progress-time-current">
                    {msToTime(progress || 0)}
                </div>
                <div className="track-progress-time-left">
                    -{msToTime(left)}
                </div>
            </div>
        </div>
    );
};

interface TrackControlProps {
    playing: PlayingState
    track?: ITrack
    isFav?: boolean
    onPause: () => void
    onPlay: () => void
    onPrev: () => void
    onNext: () => void
    onFav: () => void
}

const TrackControls = (
    { playing, isFav, onPause, onPlay, onPrev, onNext, onFav }: TrackControlProps,
) => {
    return (
        <div className="track-controls track-controls-full">
            <IonIcon onClick={onFav} icon={isFav ? heart : heartOutline} />
            <IonIcon onClick={onPrev} icon={playSkipBack} />
            {playing.paused
                ? (
                    <IonIcon onClick={onPlay} className="play-pause" icon={play} />
                )
                : (
                    <IonIcon onClick={onPause} className="play-pause" icon={pause} />
                )}
            <IonIcon onClick={onNext} icon={playSkipForward} />
            <IonIcon icon={removeCircleOutline} />
        </div>
    );
};

interface TrackPlayerProps {
    track?: ITrack
    closed?: boolean
}
const TrackPlayer = ({ closed }: TrackPlayerProps) => {
    const state = useContext(AppContext);
    const dispatch = state.dispatch
    const playing = getPlaying(state);
    const handleClose = useCallback(() => {
        dispatch(ActionCreators.closePlayer());
    }, [dispatch]);

    if (!playing)
    {
        return null;
    }

    const open = isPlayerOpen(state);
    const track = getCurrentTrack(state);
    const isFav = isFavTrack(state, track);


    return (
        <IonModal
            isOpen={open}

            onDidDismiss={handleClose}
        >
            <IonHeader className="track-player">
                <IonToolbar>
                    <IonButtons slot="start">
                        <IonButton fill="clear" onClick={() => dispatch(ActionCreators.closePlayer())}>
                            <IonIcon icon={arrowDown} />
                        </IonButton>
                    </IonButtons>
                    <IonTitle>
                        {track.title}
                    </IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="track-content">
                <img src={img(track.img)} alt={track.title} />
                <h2>{track.title}</h2>
                <h4>{track.artist}</h4>
                <TrackProgress
                    playing={playing}
                    track={track}
                    onSeek={(n: number) => dispatch(ActionCreators.seekTrack(n))}
                />
                <TrackControls
                    playing={playing}
                    track={track}
                    isFav={isFav}
                    onPause={() => dispatch(ActionCreators.pauseTrack())}
                    onPlay={() => dispatch(ActionCreators.playTrack())}
                    onPrev={() => dispatch(ActionCreators.prevTrack())}
                    onNext={() => dispatch(ActionCreators.nextTrack())}
                    onFav={() => dispatch(ActionCreators.favTrack(track))}
                />
            </IonContent>
        </IonModal>
    );
};

export default TrackPlayer;
