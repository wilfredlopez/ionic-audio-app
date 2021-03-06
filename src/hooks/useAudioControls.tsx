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

interface Props extends React.AudioHTMLAttributes<any> {
    src: string;
}
interface TimeRangeType {
    start: number; end: number
}
const parseTimeRanges = (ranges: TimeRanges) => {
    const result: TimeRangeType[] = [];

    for (let i = 0; i < ranges.length; i++)
    {
        result.push({
            start: ranges.start(i),
            end: ranges.end(i),
        });
    }

    return result;
};
const wrapEvent = <T extends any = any>(userEvent?: (event: any) => void, proxyEvent?: (event: T) => void) => {
    return (event: T) => {
        try
        {
            proxyEvent && proxyEvent(event);
        } finally
        {
            userEvent && userEvent(event);
        }
    };
};

export type useAudioContentProps =
    & Props
    & (AudioHTMLAttributes<HTMLAudioElement> | null);

function turnSecondsToMinutes(s: number) {
    return (s - (s %= 60)) / 60 + (9 < Math.round(s) ? ":" : ":0") + Math.round(s)
}

function turnSecondsToMinutesReverse(s: number, totalDuration: number) {
    return turnSecondsToMinutes(totalDuration - s)
}


const useAudioControls = (props: useAudioContentProps) => {
    const audioRef = React.createRef<HTMLAudioElement>();
    const audioEl = <MyAudio {...props} ref={audioRef} />;
    const currentAudioTimeRef = React.useRef("0");
    const currentAudioTimeLeftRef = React.useRef("0");
    let lockPlay: boolean = false;

    const controls = {
        play: () => {
            const eleme = audioRef.current
            if (!eleme)
            {
                return
            }
            if (!lockPlay)
            {
                const promise = eleme.play();
                const isPromise = typeof promise === "object";

                if (isPromise)
                {
                    lockPlay = true;
                    const resetLock = () => {
                        lockPlay = false;
                    };
                    promise.then(resetLock, resetLock);
                }

                return promise;
            }
            return undefined;

        },
        mute: () => {
            if (audioRef.current)
            {
                audioRef.current.muted = true;
            }
        },
        pause: () => {
            const el = audioRef.current;
            if (el && !lockPlay)
            {
                return el.pause();
            }
            // if (audioRef.current)
            // {
            //     audioRef.current.pause();
            // }
        },
        seek: (time: number) => {
            function audioSeak(value: number) {
                var seekto = durationState * (value / 100);
                audioRef.current!.currentTime = seekto;
            }

            audioSeak(time);
        },
        unmute: () => {
            if (audioRef.current)
            {
                audioRef.current.muted = false;
            }
        },
        volume: (volume: number) => {
            // if (audioRef.current)
            // {
            //     audioRef.current.volume = volume;
            // }
            const el = audioRef.current;
            if (!el)
            {
                return;
            }
            volume = Math.min(1, Math.max(0, volume));
            el.volume = volume;
            setVolumeState(volume)
        },
    };

    const [
        bufferedState,
        setBufferedState
    ] = React.useState<TimeRangeType[]>([]);


    const [timeState, setTimeState] = React.useState(0);
    const [durationState, setDurationState] = React.useState(0);
    const [percentPlayed, setPercentPlayed] = React.useState(0);
    const [volumeState, setVolumeState] = React.useState(1);
    const [
        // muteState
        , setMuteState] = React.useState(false);
    const [
        // pausedState
        ,
        setPausedState] = React.useState(true);

    React.useEffect(() => {
        const audioFile = audioRef.current;

        if (audioFile && audioFile.duration)
        {
            setDurationState(audioFile.duration);
        }
    }, [audioRef]);


    const getPercentPlayed = React.useCallback(
        function getPercentPlayed(secs: number) {
            return secs * (100 / durationState);
        },
        [durationState],
    );


    React.useLayoutEffect(() => {
        if (currentAudioTimeRef)
        {

            let totalPercent = turnSecondsToMinutes(timeState);
            currentAudioTimeRef.current = totalPercent;
        }
        if (currentAudioTimeLeftRef)
        {

            let totalLeft = turnSecondsToMinutesReverse(timeState, durationState);
            currentAudioTimeLeftRef.current = totalLeft;
        }
        //eslint-disable-next-line
    }, [timeState]);




    const onPlay = () => setPausedState(false);
    const onPause = () => setPausedState(true);
    const onVolumeChange = () => {
        const el = audioRef.current;
        if (!el)
        {
            return;
        }
        setMuteState(el.muted)
        setVolumeState(el.volume)
    };
    const onDurationChange = () => {
        const el = audioRef.current;
        if (!el)
        {
            return;
        }
        const { duration, buffered } = el;
        setDurationState(duration)
        setBufferedState(parseTimeRanges(buffered))
    };
    const onTimeUpdate = () => {
        const el = audioRef.current;
        if (!el)
        {
            return;
        }
        setTimeState(el.currentTime)
        setPercentPlayed(getPercentPlayed(el.currentTime));
    };
    const onProgress = () => {
        const el = audioRef.current;
        if (!el)
        {
            return;
        }
        setBufferedState(parseTimeRanges(el.buffered))
    };

    const Listeners = {
        onPlay: wrapEvent(props.onPlay, onPlay),
        onPause: wrapEvent(props.onPause, onPause),
        onVolumeChange: wrapEvent(props.onVolumeChange, onVolumeChange),
        onDurationChange: wrapEvent(props.onDurationChange, onDurationChange),
        onTimeUpdate: wrapEvent(props.onTimeUpdate, onTimeUpdate),
        onProgress: wrapEvent(props.onProgress, onProgress),
    }

    //Initialize states
    React.useEffect(() => {
        const el = audioRef.current!;
        if (!el)
        {
            return;
        }

        setVolumeState(el.volume)
        setMuteState(el.muted)
        setPausedState(el.paused)
        // Start media, if autoPlay requested.
        if (props.autoPlay && el.paused)
        {
            controls.play();
        }
    }, [props.src, props.autoPlay, audioRef, controls]);

    //Append listeners
    React.useEffect(() => {
        const currentAudio = audioRef.current;
        // function timeListener(this: HTMLAudioElement, _event: Event) {
        //     setPercentPlayed(getPercentPlayed(this.currentTime));
        //     setTimeState(this.currentTime);
        // }
        // function durationChange(this: HTMLAudioElement, _event: Event) {
        //     setDurationState(this.duration);
        // }
        if (currentAudio)
        {
            // currentAudio.addEventListener("timeupdate", timeListener);
            // currentAudio.addEventListener("durationchange", durationChange);
            // currentAudio.addEventListener('play', Listeners.onPlay)
            // currentAudio.addEventListener('pause', Listeners.onPause)
            currentAudio.addEventListener('durationchange', Listeners.onDurationChange)
            currentAudio.addEventListener('progress', Listeners.onProgress)
            currentAudio.addEventListener('timeupdate', Listeners.onTimeUpdate)
            currentAudio.addEventListener('volumechange', Listeners.onVolumeChange)
        }
        return () => {
            if (currentAudio)
            {
                // currentAudio.removeEventListener("timeupdate", timeListener);
                // currentAudio.removeEventListener("durationchange", durationChange);
                // currentAudio.removeEventListener('play', Listeners.onPlay)
                // currentAudio.removeEventListener('pause', Listeners.onPause)
                currentAudio.removeEventListener('durationchange', Listeners.onDurationChange)
                currentAudio.removeEventListener('progress', Listeners.onProgress)
                currentAudio.removeEventListener('timeupdate', Listeners.onTimeUpdate)
                currentAudio.removeEventListener('volumechange', Listeners.onVolumeChange)
            }
        };

    }, [audioRef, Listeners]);


    const state: HTMLMediaState = {
        buffered: bufferedState,
        time: timeState,
        percentPlayed: percentPlayed,
        duration: durationState,
        muted: audioRef.current?.muted || false,
        // muted: muteState,
        paused: audioRef.current?.paused || true,
        // paused: pausedState,
        // volume: audioRef.current?.volume || 0,
        volume: volumeState,
    };

    // const [state, setState] = React.useState();

    return [{ audio: audioEl, state, controls, ref: audioRef, currentAudioTimeRef, currentAudioTimeLeftRef }];
};

const MyAudio = React.forwardRef<HTMLAudioElement>((props, ref) => (
    <audio {...props} ref={ref}></audio>
));

export default useAudioControls;
