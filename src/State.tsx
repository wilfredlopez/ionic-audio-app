import React, { Reducer } from "react";
import { assertNever, deepCopy } from '@wilfredlopez/react-utils/dist'

const initialState: AppContextState = {
    dispatch: () => { },
    playing: {
        index: 0,
        progress: 27000,
        isPlaying: false,
        currentAudioTime: '0:00',
        percentPlayed: 0
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
                id: "5de11a305a58b41df485e98a",
                name: "Ozuna - Dificil Olvidar",
                audioUrl:
                    "https://res.cloudinary.com/wlopez/video/upload/v1575033391/vapemusic2/2019/10/Ozuna%20%E2%80%93%20Dif%C3%ADcil%20Olvidar.mp3/gkxjvzeulzhoy9l0mzz8.mp3",
                imageUrl:
                    "https://res.cloudinary.com/wlopez/image/upload/v1575033390/vapemusic2/2019/10/Ozuna%20-%20Niviru%20Cover.jpg/Ozuna_-_Niviru_Cover_z7mtjj.jpg",
                artist: "Ozuna",
                title: "Dificil De Olvidar",
                artistList: [],
                genre: "Reggaeton",
            },
            {
                id: "5e514f8e47f6b853d0439a89",
                name: "Reik Ft. Farruko &  Camilo - Si Me Dices Que Si",
                audioUrl:
                    "https://res.cloudinary.com/wlopez/video/upload/v1582387085/vapemusic2/2020/1/Farruko_-_Si_Me_Dices_Que_Si.mp3",
                imageUrl:
                    "https://res.cloudinary.com/wlopez/image/upload/v1582385647/vapemusic2/2020/1/Si_Me_Dices_Que_Si.jpg",
                artist: "Reik Ft. Farruko &  Camilo",
                artistList: [],
                genre: "Reggaeton",
                title: "Si Me Dices Que Si",
            },
            {
                id: "5e514f8e47f6b853d0439a19",
                name: "Reik Ft. Farruko &  Camilo - Si Me Dices Que Si",
                audioUrl:
                    "https://res.cloudinary.com/wlopez/video/upload/v1582387085/vapemusic2/2020/1/Farruko_-_Si_Me_Dices_Que_Si.mp3",
                artistList: [],
                genre: "Reggaeton",
                title: "Capricornio",
                artist: "Arcangel",
                imageUrl: "https://res.cloudinary.com/wlopez/image/upload/v1577401075/vapemusic2/2019/11/Arcangel_-_Historias_de_un_Capricornio_g6p2su.jpg",
            },
            {
                album: "YHLQMDLG",
                artist: "Bad Bunny",
                artistList: ["bad bunny"],
                audioUrl: "https://res.cloudinary.com/wlopez/video/upload/v1583164622/vapemusic2/2020/2/dds4cztgxwdzmtvlgrfl.mp3",
                createdAt: "2020-03-02T15:57:04.814Z",
                genre: "Reggaeton",
                id: "5e5d2cd01d30ca3670e2311b",
                imageUrl: "https://res.cloudinary.com/wlopez/image/upload/v1583164475/vapemusic2/2020/2/La_Dificil.jpg",
                name: "Bad Bunny - La Dificil",
                promoted: true,
                title: "La Dificil",
                updatedAt: "2020-03-02T15:57:04.814Z",
                viewCount: 7,
            },
            {
                album: "Six Feet Apart - Luke Combs (Unreleased, New Song) (Performed at the Grand Ole Opry)",
                artist: "Luke Combs",
                artistList: ["luke combs"],
                audioUrl: "https://res.cloudinary.com/wlopez/video/upload/v1588539413/vapemusic2/2020/4/Six_Feet_Apart_-_Luke_Combs_Unreleased.mp3",
                createdAt: "2020-05-03T20:56:54.473Z",
                genre: "pop-r&b",
                id: "5eaf30166eccb80012ac804e",
                imageUrl: "https://res.cloudinary.com/wlopez/image/upload/v1588538906/vapemusic2/2020/4/Six_Feet_Apart_Unreleased.jpg",
                name: "Luke Combs - Six Feet Apart (Unreleased)",
                promoted: true,
                title: "Six Feet Apart (Unreleased)",
                updatedAt: "2020-05-03T20:56:54.473Z",
                viewCount: 6,
            }
        ],
        hotTracks: ["5de11a305a58b41df485e98a", "5e514f8e47f6b853d0439a19", "5e5d2cd01d30ca3670e2311b"],
        newTracks: ["5de11a305a58b41df485e98a", "5e514f8e47f6b853d0439a19", "5e5d2cd01d30ca3670e2311b", "5eaf30166eccb80012ac804e"],
    },
};


export type Song = {
    id: string,
    artist: string,
    title: string,
    genre: string,
    album?: string,
    viewCount?: number,
    promoted?: boolean,
    imageUrl: string,
    audioUrl: string,
    createdAt?: string,
    updatedAt?: string,
    artistList?: Array<string>,
    name: string,
};


export interface PlayingState {
    index: number;
    isPlaying: boolean;
    currentAudioTime: string
    percentPlayed: number
    progress: number
}

export interface AppContextState {
    playing: PlayingState;
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
export type ITrack = Song
// export interface ITrack {
//     id: string;
//     title: string;
//     artist: string;
//     img: string;
//     time: number;
// }
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
type PERCENT_PLAYED_ACTION = {
    type: "PERCENT_PLAYED";
    payload: number
};

type AUDIO_TIME_ACTION = {
    type: "AUDIO_TIME";
    payload: string
};

type ADD_SONGS_ACTION = {
    type: "ADD_SONGS";
    payload: ITrack[]
};

type ADD_SONGS_IF_NOT_ACTION = {
    type: "ADD_SONGS_IF_NOT";
    payload: ITrack[]
}

export type Actions =
    | SET_PLAYER_OPEN_ACTION
    | PAUSE_ACTION
    | PLAY_ACTION
    | SEEK_ACTION
    | NEXT_ACTION
    | PREV_ACTION
    | FAV_ACTION
    | LOGGED_IN_ACTION
    | LOGOUT_ACTION | ADD_SONGS_ACTION | ADD_SONGS_IF_NOT_ACTION
    | PERCENT_PLAYED_ACTION | AUDIO_TIME_ACTION

export interface Action {
    type: Actions;
    payload?: any;
}

export type AppReducer = Reducer<AppContextState, Actions>;

const reducer = (state: AppContextState, action: Actions): AppContextState => {
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
                    isPlaying: false,
                },
            };
        }
        case "PLAY": {
            if (action.track && action.track !== ct)
            {
                const newRecentTracks = getRecentTracks(state).filter((t) =>
                    t.id !== action.track.id
                );
                //if track comes from search it might not exist.
                let index = getTrackIndex(state, action.track.id);
                let tracks = state.music.tracks

                //adding track to end of the array of tracks if index=-1 and settings index to last.
                if (index === -1)
                {
                    index = tracks.length
                    tracks.push(action.track)
                }

                return {
                    ...state,
                    music: {
                        ...state.music,
                        tracks: [...tracks]
                    },
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
                        isPlaying: true,
                        progress: 0,
                        currentAudioTime: '0',
                        percentPlayed: 0
                    },
                };
            }
            return {
                ...state,
                playing: {
                    ...playing,
                    isPlaying: true
                },
            };
        }
        case "SEEK": {
            return {
                ...state,
                playing: {
                    ...playing,
                    progress: action.time
                },
            };
        }
        case "NEXT": {
            return {
                ...state,
                playing: {
                    ...state.playing,
                    index: (playing.index + 1) % getTracks(state).length,
                    progress: 0,
                },
            };
        }
        case "PREV": {
            return {
                ...state,
                playing: {
                    ...state.playing,
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
                playing: {
                    ...state.playing,
                    isPlaying: false,
                    currentAudioTime: '0',
                    index: 0,
                    percentPlayed: 0,
                    progress: 0
                },
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
        case "PERCENT_PLAYED":
            return {
                ...state, playing: {
                    ...state.playing,
                    percentPlayed: action.payload
                }
            }
        case "AUDIO_TIME":
            return {
                ...state, playing: {
                    ...state.playing,
                    currentAudioTime: action.payload
                }
            }
        case "ADD_SONGS": {
            const oldTracks = deepCopy(state.music.tracks)
            const newTracks = action.payload.map(s => s.id)
            const hotTracks = action.payload.filter(s => s.promoted && s.promoted === true).map(s => s.id)
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: [...action.payload, ...oldTracks,],
                    newTracks: [...newTracks, ...state.music.newTracks,],
                    hotTracks: [...hotTracks, ...state.music.hotTracks,]
                }
            }
        }
        case "ADD_SONGS_IF_NOT": {
            return {
                ...state,
                music: {
                    ...state.music,
                    tracks: [...action.payload, ...state.music.tracks,],
                }
            }
        }
        default:
            assertNever(action)
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

    setPercentPlayed: (percent: number) => ({
        type: 'PERCENT_PLAYED',
        payload: percent
    } as PERCENT_PLAYED_ACTION),

    addSongs: (songs: ITrack[]) => ({
        type: 'ADD_SONGS',
        payload: songs
    } as ADD_SONGS_ACTION),

    addSongsIfNotExist: (songs: ITrack[]) => ({
        type: 'ADD_SONGS_IF_NOT',
        payload: songs
    } as ADD_SONGS_IF_NOT_ACTION),

    setCurrentAudioTime: (time: string) => ({
        type: "AUDIO_TIME",
        payload: time
    } as AUDIO_TIME_ACTION),

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