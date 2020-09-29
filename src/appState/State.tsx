import { Reducer } from 'react'
import { assertNever } from '@wilfredlopez/react-utils'

import {
  getMusic,
  getCurrentTrack,
  getFavTracks,
  getRecentTracks,
  getPlaying,
  getTrackIndex,
  getTracks,
  getUser,
  isFavTrack,
} from './state-utils'
import { Actions, AppContextState } from './state.model'
import {
  setLocalStorageFaveTracks,
  setLocalStorageRecentTracks,
  setLocalStorageAllTracks,
} from './initialState'

export interface Action {
  type: Actions
  payload?: any
}

export type AppReducer = Reducer<AppContextState, Actions>

export const reducer = (
  state: AppContextState,
  action: Actions
): AppContextState => {
  const playing = getPlaying(state)
  const ct = getCurrentTrack(state)
  const user = getUser(state)

  switch (action.type) {
    case 'SET_INITIAL_STATE': {
      return action.state
    }
    case 'SET_PLAYER_OPEN': {
      return {
        ...state,
        ui: {
          ...state.ui,
          playerOpen: action.open,
        },
      }
    }
    case 'PAUSE': {
      return {
        ...state,
        playing: {
          ...playing,
          isPlaying: false,
        },
      }
    }
    case 'PLAY': {
      if (action.track && action.track !== ct) {
        const newRecentTracks = getRecentTracks(state).filter(
          t => t.id !== action.track.id
        )
        //if track comes from search it might not exist.
        let index = getTrackIndex(state, action.track.id)
        let tracks = state.music.tracks

        //adding track to end of the array of tracks if index=-1 and settings index to last.
        if (index === -1) {
          index = tracks.length
          tracks.push(action.track)
        }

        setLocalStorageRecentTracks([action.track, ...newRecentTracks])

        return {
          ...state,
          music: {
            ...state.music,
            tracks: [...tracks],
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
            percentPlayed: 0,
          },
        }
      }
      return {
        ...state,
        playing: {
          ...playing,
          isPlaying: true,
        },
      }
    }
    case 'SEEK': {
      return {
        ...state,
        playing: {
          ...playing,
          progress: action.time,
        },
      }
    }
    case 'NEXT': {
      return {
        ...state,
        playing: {
          ...state.playing,
          index: (playing.index + 1) % getTracks(state).length,
          progress: 0,
        },
      }
    }
    case 'PREV': {
      return {
        ...state,
        playing: {
          ...state.playing,
          index: Math.max(0, (state.playing?.index || 0) - 1),
          progress: 0,
        },
      }
    }
    case 'FAV': {
      const isFav = isFavTrack(state, action.track)
      const newFavs = getFavTracks(state).filter(t => t.id !== action.track.id)
      const favs = !isFav ? [ct, ...newFavs] : newFavs
      setLocalStorageFaveTracks(favs)
      return {
        ...state,
        user: {
          ...user,
          favTracks: favs,
        },
      }
    }
    case 'LOGOUT': {
      return {
        ...state,
        playing: {
          ...state.playing,
          isPlaying: false,
          currentAudioTime: '0',
          index: 0,
          percentPlayed: 0,
          progress: 0,
        },
        auth: {
          ...state.auth,
          user: null,
        },
      }
    }
    case 'LOGGED_IN': {
      return {
        ...state,
        auth: {
          ...state.auth,
          user: action.user,
        },
      }
    }
    case 'PERCENT_PLAYED':
      return {
        ...state,
        playing: {
          ...state.playing,
          percentPlayed: action.payload,
        },
      }
    case 'AUDIO_TIME':
      return {
        ...state,
        playing: {
          ...state.playing,
          currentAudioTime: action.payload,
        },
      }
    case 'ADD_SONGS': {
      const music = getMusic(state, action.payload, true) //deep copy
      setLocalStorageAllTracks(music.tracks)
      return {
        ...state,
        music: music,
      }
    }
    case 'ADD_SONGS_IF_NOT': {
      const music = getMusic(state, action.payload)
      setLocalStorageAllTracks(music.tracks)
      return {
        ...state,
        music: music,
      }
    }
    default:
      assertNever(action)
      return state
  }
}
