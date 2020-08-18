import {
    IonIcon,
    IonThumbnail
} from "@ionic/react";
import { pause, play } from "ionicons/icons";
import React, { useCallback } from "react";
import { useAppState } from "src/appState/AppContextProvider";
import {
    getCurrentTrack, getPlaying,
    Song,
    PlayingState,
    ActionCreators
} from "../appState/State";
import { StringHelper } from '@wilfredlopez/react-utils'
import "./TrackPreview.css";

interface TrackProps {
    playing: PlayingState
    track: Song
}

const TrackProgress = ({ playing }: TrackProps) => {
    // const progress = playing.progress;
    // const left = track.time - (progress || 0);
    // const percent = ((progress || 0) / 20) * 100;
    return (
        <div className="track-preview-progress">
            <div className="track-preview-progress-track">
                <div
                    className="track-preview-progress-current"
                    style={{ width: `${playing.percentPlayed}%` }}
                >
                </div>
            </div>
        </div>
    );
};


const TrackPreview = () => {
    const [state, dispatch] = useAppState()

    const playing = getPlaying(state);


    const track = getCurrentTrack(state);

    const doPlayToggle = useCallback((e) => {
        // Stop the toggle from opening the modal
        e.stopPropagation();

        if (!playing.isPlaying)
        {
            dispatch(ActionCreators.playTrack());
        } else
        {
            dispatch(ActionCreators.pauseTrack());
        }
    }, [dispatch, playing]);

    if (!playing) return null;
    return (
        <div
            className="track-preview"
            onClick={() => dispatch(ActionCreators.openPlayer())}
        >
            <TrackProgress playing={playing} track={track} />

            <div className="track-preview-wrapper">
                <div className="track-thumbnail">
                    <IonThumbnail>
                        <img src={track.imageUrl} alt={track.title} className="track-art" />
                    </IonThumbnail>
                </div>

                <div className="track-info">
                    <span className="track-name">{StringHelper.reduceLongString(track.title, 30)}</span>
          &middot;
          <span className="track-artist">{StringHelper.reduceLongString(track.artist, 30)}</span>
                </div>

                <div className="track-controls">
                    {!playing.isPlaying
                        ? (
                            <IonIcon icon={play} onClick={doPlayToggle} />
                        )
                        : (
                            <IonIcon icon={pause} onClick={doPlayToggle} />
                        )}
                </div>
            </div>
        </div>
    );
};

export default TrackPreview;
