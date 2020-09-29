import { Scalars, Maybe } from '../hooks/QueryTypes'
export type Song = {
  __typename?: 'Song'
  id: Scalars['ID']
  artist: Scalars['String']
  title: Scalars['String']
  genre: Scalars['String']
  album?: Maybe<Scalars['String']>
  viewCount?: Maybe<Scalars['Int']>
  promoted?: Maybe<Scalars['Boolean']>
  imageUrl: Scalars['String']
  audioUrl: Scalars['String']
  createdAt?: Maybe<Scalars['DateTime']>
  updatedAt?: Maybe<Scalars['DateTime']>
  artistList: Array<Scalars['String']>
  name: Scalars['String']
}
export interface PlayingState {
  index: number
  isPlaying: boolean
  currentAudioTime: string
  percentPlayed: number
  progress: number
}

export interface User {
  name: string
  email: string
  id: string
}

export type SET_INITIAL_STATE = {
  type: 'SET_INITIAL_STATE'
  state: AppContextState
}

export type SET_PLAYER_OPEN_ACTION = {
  type: 'SET_PLAYER_OPEN'
  open: boolean
}

export type PAUSE_ACTION = {
  type: 'PAUSE'
  open: boolean
}

export type PLAY_ACTION = {
  type: 'PLAY'
  track: Song
}

export type SEEK_ACTION = {
  type: 'SEEK'
  time: number
}

export type NEXT_ACTION = {
  type: 'NEXT'
  track: Song
}

export type PREV_ACTION = {
  type: 'PREV'
}

export type FAV_ACTION = {
  type: 'FAV'
  track: Song
}

export type LOGGED_IN_ACTION = {
  type: 'LOGGED_IN'
  user: User
}

export type LOGOUT_ACTION = {
  type: 'LOGOUT'
}
export type PERCENT_PLAYED_ACTION = {
  type: 'PERCENT_PLAYED'
  payload: number
}

export type AUDIO_TIME_ACTION = {
  type: 'AUDIO_TIME'
  payload: string
}

export type ADD_SONGS_ACTION = {
  type: 'ADD_SONGS'
  payload: Song[]
}

export type ADD_SONGS_IF_NOT_ACTION = {
  type: 'ADD_SONGS_IF_NOT'
  payload: Song[]
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
  | LOGOUT_ACTION
  | ADD_SONGS_ACTION
  | ADD_SONGS_IF_NOT_ACTION
  | PERCENT_PLAYED_ACTION
  | AUDIO_TIME_ACTION
  | SET_INITIAL_STATE

export interface AppContextState {
  playing: PlayingState
  dispatch: React.Dispatch<Actions>
  user: {
    favTracks: Song[]
    recentTracks: Song[]
  }
  auth: {
    user: User | null
  }
  ui: {
    playerOpen: boolean
  }
  music: {
    tracks: Song[]
    hotTracks: string[]
    newTracks: string[]
  }
}
