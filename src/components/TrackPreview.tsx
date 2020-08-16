import {
    IonIcon,
    IonThumbnail
} from "@ionic/react";
import { pause, play } from "ionicons/icons";
import React, { useCallback, useContext } from "react";
import {
    AppContext,
    getCurrentTrack, getPlaying,
    ITrack,
    PlayingState,
    ActionCreators
} from "../State";
import { img } from "../util";
import "./TrackPreview.css";

interface TrackProps {
    playing: PlayingState
    track: ITrack
}

const TrackProgress = ({ playing, track }: TrackProps) => {
    const progress = playing.progress;
    // const left = track.time - (progress || 0);
    const percent = ((progress || 0) / track.time) * 100;

    return (
        <div className="track-preview-progress">
            <div className="track-preview-progress-track">
                <div
                    className="track-preview-progress-current"
                    style={{ width: `${percent}%` }}
                >
                </div>
            </div>
        </div>
    );
};

interface Props {
    tabBarTop?: number
}
const TrackPreview = ({ tabBarTop = 0 }: Props) => {
    const state = useContext(AppContext);
    const dispatch = state.dispatch
    const playing = getPlaying(state);


    const track = getCurrentTrack(state);

    const doPlayToggle = useCallback((e) => {
        // Stop the toggle from opening the modal
        e.stopPropagation();

        if (playing?.paused)
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
            style={{ top: `${tabBarTop}px` }}
            className="track-preview"
            onClick={() => dispatch(ActionCreators.openPlayer())}
        >
            <TrackProgress playing={playing} track={track} />

            <div className="track-preview-wrapper">
                <div className="track-thumbnail">
                    <IonThumbnail>
                        <img src={img(track.img)} alt={track.title} className="track-art" />
                    </IonThumbnail>
                </div>

                <div className="track-info">
                    <span className="track-name">{track.title}</span>
          &middot;
          <span className="track-artist">{track.artist}</span>
                </div>

                <div className="track-controls">
                    {playing.paused
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
