import { useContext, useEffect, useState } from "react";
import { AppContext, getPlaying, ActionCreators } from "../State";


// A really naive fake play routine
const Audio = () => {
    const state = useContext(AppContext);
    const dispatch = state.dispatch

    const [, setHandle] = useState<NodeJS.Timeout | undefined>(undefined);

    useEffect(() => {
        const playing = getPlaying(state);
        let h: NodeJS.Timeout | undefined = undefined
        if (playing && !playing.paused)
        {
            clearTimeout(h);
            h = setTimeout(() => {
                dispatch(
                    ActionCreators.seekTrack(Math.floor((playing.progress || 0) + 1000)),
                );
            }, 1000);
            setHandle(h);
        }

        return () => {
            if (h)
                clearTimeout(h);
        };
    }, [state.playing, dispatch, state]);

    return null;
};

export default Audio;
