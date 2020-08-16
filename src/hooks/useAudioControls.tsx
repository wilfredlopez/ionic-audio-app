import React, { AudioHTMLAttributes } from "react";

export interface HTMLMediaProps
    extends React.AudioHTMLAttributes<any>, React.VideoHTMLAttributes<any> {
    src: string;
}

export interface HTMLMediaState {
    buffered: any[];
    duration: number;
    paused: boolean;
    muted: boolean;
    time: number;
    percentPlayed: number;
    volume: number;
}

interface Props extends HTMLMediaProps {
    src: string;
}

export type useAudioContentProps =
    & Props
    & (AudioHTMLAttributes<HTMLAudioElement> | null);

const useAudioContent = (props: useAudioContentProps) => {
    const audioRef = React.createRef<HTMLAudioElement>();
    const audioEl = <MyAudio {...props} ref={audioRef} />;

    const controls = {
        play: () => {
            if (audioRef.current)
            {
                audioRef.current.play();
            }
        },
        mute: () => {
            if (audioRef.current)
            {
                audioRef.current.muted = true;
            }
        },
        pause: () => {
            if (audioRef.current)
            {
                audioRef.current.pause();
            }
        },
        seek: (time: number) => {
            audioSeak(time);
            //TODO: i dont know if this works
            // audioRef.current!.msInsertAudioEffect("seek", true, { time: time })
        },
        unmute: () => {
            if (audioRef.current)
            {
                audioRef.current.muted = false;
            }
        },
        volume: (volume: number) => {
            if (audioRef.current)
            {
                audioRef.current.volume = volume;
            }
        },
    };

    const [
        bufferedState,
        // setBufferedState
    ] = React.useState([0]);

    //TODO: listen buffered state
    // React.useEffect(() => {
    //   if (audioRef.current) {
    //     setBufferedState([audioRef.current.buffered.length]);
    //   }
    // }, [audioRef]);
    const [timeState, setTimeState] = React.useState(0);
    const [durationState, setDurationState] = React.useState(0);
    const [percentPlayed, setPercentPlayed] = React.useState(0);

    React.useEffect(() => {
        const audioFile = audioRef.current;

        if (audioFile && audioFile.duration)
        {
            setDurationState(audioFile.duration);
        }
    }, [audioRef]);

    function audioSeak(value: number) {
        var seekto = durationState * (value / 100);
        audioRef.current!.currentTime = seekto;
    }

    const getPercentPlayed = React.useCallback(
        function getPercentPlayed(secs: number) {
            return secs * (100 / durationState);
        },
        [durationState],
    );

    React.useEffect(() => {
        const currentAudio = audioRef.current;
        function timeListener(this: HTMLAudioElement, event: Event) {
            setPercentPlayed(getPercentPlayed(this.currentTime));
            setTimeState(this.currentTime);
        }
        function durationChange(this: HTMLAudioElement, _event: Event) {
            setDurationState(this.duration);
        }
        if (currentAudio)
        {
            currentAudio.addEventListener("timeupdate", timeListener);
            currentAudio.addEventListener("durationchange", durationChange);
        }
        return () => {
            if (currentAudio)
            {
                currentAudio.removeEventListener("timeupdate", timeListener);
                currentAudio.removeEventListener("durationchange", durationChange);
            }
        };
    }, [audioRef, getPercentPlayed]);

    const state: HTMLMediaState = {
        buffered: bufferedState,
        time: timeState,
        percentPlayed: percentPlayed,
        duration: durationState,
        muted: audioRef.current?.muted || false,
        paused: audioRef.current?.paused || true,
        volume: audioRef.current?.volume || 0,
    };

    // const [state, setState] = React.useState();

    return [{ audio: audioEl, state, controls, ref: audioRef }];
};

const MyAudio = React.forwardRef<HTMLAudioElement>((props, ref) => (
    <audio {...props} ref={ref}></audio>
));

export default useAudioContent;
