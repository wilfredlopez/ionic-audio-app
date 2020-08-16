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
    getCurrentTrack,
    isFavTrack,
    ITrack,
} from "../State";

import useAudioControls from '../hooks/useAudioControls'
import "./TrackPlayer.css";

interface TrackProgressProps {
    currentAudioTime: string
    percentPlayed: number
    onSeek: (time: number) => void
}

const TrackProgress = ({ onSeek, percentPlayed, currentAudioTime }: TrackProgressProps) => {

    return (
        <div className="track-progress">
            <IonRange
                value={percentPlayed}
                onIonChange={(e: any) => {
                    const value = e.detail.value;
                    if (+value !== percentPlayed)
                    {
                        onSeek(+e.detail.value);
                    }
                }}
            />
            <div className="track-progress-time">
                <div className="track-progress-time-current">
                    {currentAudioTime}
                    {/* {msToTime(time)} */}
                </div>
                <div className="track-progress-time-left">
                    {/* -{msToTime(left)} */}
                </div>
            </div>
        </div>
    );
};

interface TrackControlProps {
    isPlaying: boolean
    track?: ITrack
    isFav?: boolean
    onPause: () => void
    onPlay: () => void
    onPrev: () => void
    onNext: () => void
    onFav: () => void
}

const TrackControls = (
    { isPlaying, isFav, onPause, onPlay, onPrev, onNext, onFav }: TrackControlProps,
) => {
    return (
        <div className="track-controls track-controls-full">
            <IonIcon onClick={onFav} icon={isFav ? heart : heartOutline} />
            <IonIcon onClick={onPrev} icon={playSkipBack} />
            {!isPlaying
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

function turnSecondsToMinutes(s: number) {
    return (s - (s %= 60)) / 60 + (9 < Math.round(s) ? ":" : ":0") + Math.round(s)
}


const TrackPlayer = (_props: TrackPlayerProps) => {
    const state = useContext(AppContext);
    const dispatch = state.dispatch
    const { isPlaying } = state.playing
    const handleClose = useCallback(() => {
        dispatch(ActionCreators.closePlayer());
    }, [dispatch]);

    // const [muted, setMuted] = React.useState(false);
    const currentAudioTimeRef = React.useRef("0");

    // function toggleMute() {
    //     if (muted)
    //     {
    //         controls.unmute();
    //         setMuted(false);
    //     } else
    //     {
    //         controls.mute();
    //         setMuted(true);
    //     }
    // }
    const handleTogglePlaying = () => {
        if (isPlaying)
        {
            // controls.pause();//useEffect should do it automatically
            dispatch(ActionCreators.pauseTrack())
        } else
        {
            // controls.play(); //useEffect should do it automatically
            dispatch(ActionCreators.playTrack())
        }
    };

    const open = isPlayerOpen(state);
    const track = getCurrentTrack(state);
    const isFav = isFavTrack(state, track);
    const [{ audio, controls, state: audioState }] = useAudioControls({
        src: track.audioUrl,
        autoPlay: false,
        loop: false,
        "aria-label": track.name,
    });

    const percentPlayed = audioState.percentPlayed

    React.useEffect(() => {
        dispatch(ActionCreators.setPercentPlayed(percentPlayed))
        //eslint-disable-next-line
    }, [percentPlayed])

    //React to change in isPlaying state.
    React.useEffect(() => {
        if (isPlaying)
        {
            controls.play()
        } else
        {
            controls.pause()
        }
        //eslint-disable-next-line
    }, [isPlaying, track])

    React.useLayoutEffect(() => {
        if (currentAudioTimeRef)
        {
            let totalPercent = turnSecondsToMinutes(audioState.time);
            currentAudioTimeRef.current = totalPercent;
            dispatch(ActionCreators.setCurrentAudioTime(totalPercent))
        }
        //eslint-disable-next-line
    }, [audioState.time]);


    function handleSeek(seekTo: number) {
        controls.seek(seekTo);
    }

    //Autoplay... causing issues.
    // React.useLayoutEffect(() => {

    //         if (!playing.isPlaying)
    //         {
    //             controls.play();
    //             dispatch(ActionCreators.playTrack())
    //         }
    //         return () => {
    //             controls.pause();
    //             dispatch(ActionCreators.pauseTrack())
    //         };
    //         //eslint-disable-next-line
    // }, [ playing, controls]);


    return (
        <React.Fragment>
            {audio}
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
                    <img src={track.imageUrl} alt={track.title} />
                    <h2>{track.title}</h2>
                    <h4>{track.artist}</h4>
                    <TrackProgress
                        percentPlayed={audioState.percentPlayed}
                        currentAudioTime={currentAudioTimeRef.current}
                        onSeek={(n: number) => handleSeek(n)}
                    />
                    <TrackControls
                        isPlaying={isPlaying}
                        track={track}
                        isFav={isFav}
                        onPause={() => {
                            handleTogglePlaying()
                        }}
                        onPlay={() => handleTogglePlaying()}
                        onPrev={() => dispatch(ActionCreators.prevTrack())}
                        onNext={() => dispatch(ActionCreators.nextTrack())}
                        onFav={() => dispatch(ActionCreators.favTrack(track))}
                    />
                </IonContent>
            </IonModal>
        </React.Fragment>
    );
};

export default TrackPlayer;
