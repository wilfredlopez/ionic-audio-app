import React, { Reducer } from "react";

const initialState: AppContextState = {
    dispatch: () => { },
    playing: {
        index: 0,
        progress: 27000,
        paused: false,
    },
    auth: {
        user: null,
    },
    user: {
        recentTracks: [],
        favTracks: [],
    },
    ui: {
        playerOpen: false,
    },
    music: {
        tracks: [
            {
                id: "0",
                title: "Quiereme Mientras se pueda",
                artist: "Manuel Turizo",
                img: "https://res.cloudinary.com/wlopez/image/upload/v1588542709/vapemusic2/2020/4/Quiereme_Mientras_Se_Pueda.jpg",
                time: 359000,
            },
            {
                id: "5eaf3ee26eccb80012ac8056",
                title: "Casino",
                artist: "Sech",
                img: "https://res.cloudinary.com/wlopez/image/upload/v1588542708/vapemusic2/2020/4/Casino.jpg",
                time: 216000,
            },
            {
                id: "2",
                title: "Girasoles",
                artist: "Luis Fonsi",
                img: "https://res.cloudinary.com/wlopez/image/upload/v1588542047/vapemusic2/2020/4/Girasoles.jpg",
                time: 339000,
            },
            {
                id: "3",
                title: "Memories",
                artist: "Marron 5",
                img: "https://res.cloudinary.com/wlopez/image/upload/v1588541083/vapemusic2/2020/4/Memories.jpg",
                time: 257000,
            },
            {
                id: "4",
                title: "Mamacita",
                artist: "Ozuna ft. Black Eyed Peas",
                img: "https://res.cloudinary.com/wlopez/image/upload/v1586731293/vapemusic2/2020/3/Mamacita.png",
                time: 555000,
            },
            {
                id: "5",
                title: "Carne",
                artist: "Don Miguelo",
                img: "https://res.cloudinary.com/wlopez/image/upload/v1588628156/vapemusic2/2020/4/Carne.jpg",
                time: 411000,
            },
            {
                id: "6",
                title: "Velitas",
                artist: "Darell ft. Brytiago",
                img: "https://res.cloudinary.com/wlopez/image/upload/v1566749825/pxmusic/images/2019/7/736Darell_Ft_Brytiago_-_Velitas_k9k0d0.jpg",
                time: 251000,
            },
            {
                id: "7",
                title: "Capricornio",
                artist: "Arcangel",
                img: "https://res.cloudinary.com/wlopez/image/upload/v1577401075/vapemusic2/2019/11/Arcangel_-_Historias_de_un_Capricornio_g6p2su.jpg",
                time: 444000,
            },
        ],
        hotTracks: ["0", "5eaf3ee26eccb80012ac8056", "2", "3"],
        newTracks: ["4", "5", "6", "7"],
    },
};

export interface PlayingState {
    index?: number;
    progress?: number;
    paused?: boolean;
}

export interface AppContextState {
    playing: PlayingState | null;
    dispatch: React.Dispatch<Actions>;
    user: {
        favTracks: ITrack[];
        recentTracks: ITrack[];
    };
    auth: {
        user: User | null;
    };
    ui: {
        playerOpen: boolean;
    };
    music: {
        tracks: ITrack[];
        hotTracks: string[];
        newTracks: string[];
    };
}

export interface User {
    name: string;
    email: string;
    id: string;
}

export interface ITrack {
    id: string;
    title: string;
    artist: string;
    img: string;
    time: number;
}
export const AppContext = React.createContext<AppContextState>(
    {} as AppContextState,
);

type SET_PLAYER_OPEN_ACTION = {
    type: "SET_PLAYER_OPEN";
    open: boolean;
};

type PAUSE_ACTION = {
    type: "PAUSE";
    open: boolean;
};

type PLAY_ACTION = {
    type: "PLAY";
    track: ITrack;
};

type SEEK_ACTION = {
    type: "SEEK";
    time: number;
};

type NEXT_ACTION = {
    type: "NEXT";
    track: ITrack;
};

type PREV_ACTION = {
    type: "PREV";
};

type FAV_ACTION = {
    type: "FAV";
    track: ITrack;
};

type LOGGED_IN_ACTION = {
    type: "LOGGED_IN";
    user: User;
};

type LOGOUT_ACTION = {
    type: "LOGOUT";
};
export type Actions =
    | SET_PLAYER_OPEN_ACTION
    | PAUSE_ACTION
    | PLAY_ACTION
    | SEEK_ACTION
    | NEXT_ACTION
    | PREV_ACTION
    | FAV_ACTION
    | LOGGED_IN_ACTION
    | LOGOUT_ACTION;

export interface Action {
    type: Actions;
    payload?: any;
}

export type AppReducer = Reducer<AppContextState, Actions>;

const reducer = (state: AppContextState, action: Actions) => {
    const playing = getPlaying(state);
    const ct = getCurrentTrack(state);
    const user = getUser(state);

    switch (action.type)
    {
        case "SET_PLAYER_OPEN": {
            return {
                ...state,
                ui: {
                    ...state.ui,
                    playerOpen: action.open,
                },
            };
        }
        case "PAUSE": {
            return {
                ...state,
                playing: {
                    ...playing,
                    index: state.playing?.index,
                    progress: state.playing?.progress,
                    paused: true,
                },
            };
        }
        case "PLAY": {
            if (action.track && action.track !== ct)
            {
                const newRecentTracks = getRecentTracks(state).filter((t) =>
                    t.id !== action.track.id
                );
                const index = getTrackIndex(state, action.track.id);
                return {
                    ...state,
                    ui: {
                        playerOpen: true,
                    },
                    user: {
                        ...user,
                        recentTracks: [action.track, ...newRecentTracks],
                    },
                    playing: {
                        ...playing,
                        index,
                        progress: 0,
                        paused: false,
                    },
                };
            }
            return {
                ...state,
                playing: {
                    ...playing,
                    paused: false,
                },
            };
        }
        case "SEEK": {
            return {
                ...state,
                playing: {
                    ...playing,
                    progress: action.time <= ct.time ? Math.floor(action.time) : ct.time,
                },
            };
        }
        case "NEXT": {
            return {
                ...state,
                playing: {
                    index: ((playing?.index || 0) + 1) % getTracks(state).length,
                    progress: 0,
                },
            };
        }
        case "PREV": {
            return {
                ...state,
                playing: {
                    index: Math.max(0, (state.playing?.index || 0) - 1),
                    progress: 0,
                },
            };
        }
        case "FAV": {
            const isFav = isFavTrack(state, action.track);
            const newFavs = getFavTracks(state).filter((t) =>
                t.id !== action.track.id
            );
            return {
                ...state,
                user: {
                    ...user,
                    favTracks: !isFav ? [ct, ...newFavs] : newFavs,
                },
            };
        }
        case "LOGOUT": {
            return {
                ...state,
                playing: null,
                auth: {
                    ...state.auth,
                    user: null,
                },
            };
        }
        case "LOGGED_IN":
            {
                return {
                    ...state,
                    auth: {
                        ...state.auth,
                        user: action.user,
                    },
                };
            }
        default:
            return state;
    }
};

// const logger = (red: typeof reducer) => {
//     const reducerWithLogger = (state: AppContextState, action: Actions) => {
//         console.log(
//             "%cPrevious State:",
//             "color: #9E9E9E; font-weight: 700;",
//             state,
//         );
//         console.log("%cAction:", "color: #00A7F7; font-weight: 700;", action);
//         console.log(
//             "%cNext State:",
//             "color: #47B04B; font-weight: 700;",
//             red(state, action),
//         );
//         return red(state, action);
//     };

//     return reducerWithLogger;
// };

// const loggerReducer = logger(reducer);

export function AppContextProvider(props: any) {
    const fullInitialState: AppContextState = {
        ...initialState,
    };

    let [state, dispatch] = React.useReducer<AppReducer>(
        reducer as any,
        fullInitialState as any,
    );
    // let value = { state, dispatch };

    return (
        <AppContext.Provider
            value={{
                ...state,
                dispatch: dispatch,
            }}
        >
            {props.children}
        </AppContext.Provider>
    );
}

export const AppContextConsumer = AppContext.Consumer;

export const ActionCreators = {
    // Some state action creators
    openPlayer: () => ({
        type: "SET_PLAYER_OPEN",
        open: true,
    } as SET_PLAYER_OPEN_ACTION),

    closePlayer: () => ({
        type: "SET_PLAYER_OPEN",
        open: false,
    } as SET_PLAYER_OPEN_ACTION),

    pauseTrack: () => ({
        type: "PAUSE",
    } as PAUSE_ACTION),

    playTrack: (track?: ITrack) => ({
        type: "PLAY",
        track,
    } as PLAY_ACTION),

    seekTrack: (time: number) => ({
        type: "SEEK",
        time,
    } as SEEK_ACTION),

    nextTrack: () => ({
        type: "NEXT",
    } as NEXT_ACTION),

    prevTrack: () => ({
        type: "PREV",
    } as PREV_ACTION),

    favTrack: (track: ITrack) => ({
        type: "FAV",
        track,
    } as FAV_ACTION),

    logout: () => ({
        type: "LOGOUT",
    } as LOGOUT_ACTION),

    loggedIn: (user: User) => ({
        type: "LOGGED_IN",
        user,
    } as LOGGED_IN_ACTION),
}

// Some state selectors
export const isPlayerOpen = (state: AppContextState) => state.ui.playerOpen;

// Get all tracks in database
export const getTracks = (state: AppContextState) => state.music.tracks;
export const getNewTracks = (state: AppContextState) =>
    state.music.tracks.filter((t) =>
        state.music.newTracks.find((nt) => nt === t.id)
    );
export const getHotTracks = (state: AppContextState) =>
    state.music.tracks.filter((t) =>
        state.music.hotTracks.find((nt) => nt === t.id)
    );

export const getFavTracks = (state: AppContextState) => state.user.favTracks;
export const getRecentTracks = (state: AppContextState) =>
    state.user.recentTracks;
export const isFavTrack = (state: AppContextState, track: ITrack) =>
    !!state.user.favTracks.find((t) => t.id === track.id);

export const getPlaying = (state: AppContextState) => state.playing;

export const getCurrentTrack = (state: AppContextState) =>
    state.music.tracks[state.playing ? state.playing.index || 0 : 0];

export const getTrack = (state: AppContextState, id: string) =>
    state.music.tracks.find((t) => t.id === id);
export const getTrackIndex = (state: AppContextState, id: string) =>
    state.music.tracks.findIndex((t) => t.id === id);
export const getUser = (state: AppContextState) => state.user;


export const useAppState = () => {
    const state = React.useContext(AppContext)
    return [state, state.dispatch, ActionCreators] as const
}