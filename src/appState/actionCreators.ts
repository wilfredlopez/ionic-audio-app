import {
  SET_PLAYER_OPEN_ACTION,
  PAUSE_ACTION,
  PLAY_ACTION,
  SEEK_ACTION,
  NEXT_ACTION,
  PERCENT_PLAYED_ACTION,
  ADD_SONGS_ACTION,
  ADD_SONGS_IF_NOT_ACTION,
  AUDIO_TIME_ACTION,
  PREV_ACTION,
  FAV_ACTION,
  LOGOUT_ACTION,
  User,
  LOGGED_IN_ACTION,
} from '.'
import { Song } from '../generated/apolloComponents'

export const ActionCreators = {
  // Some state action creators
  openPlayer: () =>
    ({
      type: 'SET_PLAYER_OPEN',
      open: true,
    } as SET_PLAYER_OPEN_ACTION),

  closePlayer: () =>
    ({
      type: 'SET_PLAYER_OPEN',
      open: false,
    } as SET_PLAYER_OPEN_ACTION),

  pauseTrack: () =>
    ({
      type: 'PAUSE',
    } as PAUSE_ACTION),

  playTrack: (track?: Song) =>
    ({
      type: 'PLAY',
      track,
    } as PLAY_ACTION),

  seekTrack: (time: number) =>
    ({
      type: 'SEEK',
      time,
    } as SEEK_ACTION),

  nextTrack: () =>
    ({
      type: 'NEXT',
    } as NEXT_ACTION),

  setPercentPlayed: (percent: number) =>
    ({
      type: 'PERCENT_PLAYED',
      payload: percent,
    } as PERCENT_PLAYED_ACTION),

  addSongs: (songs: Song[]) =>
    ({
      type: 'ADD_SONGS',
      payload: songs,
    } as ADD_SONGS_ACTION),

  addSongsIfNotExist: (songs: Song[]) =>
    ({
      type: 'ADD_SONGS_IF_NOT',
      payload: songs,
    } as ADD_SONGS_IF_NOT_ACTION),

  setCurrentAudioTime: (time: string) =>
    ({
      type: 'AUDIO_TIME',
      payload: time,
    } as AUDIO_TIME_ACTION),

  prevTrack: () =>
    ({
      type: 'PREV',
    } as PREV_ACTION),

  favTrack: (track: Song) =>
    ({
      type: 'FAV',
      track,
    } as FAV_ACTION),

  logout: () =>
    ({
      type: 'LOGOUT',
    } as LOGOUT_ACTION),

  loggedIn: (user: User) =>
    ({
      type: 'LOGGED_IN',
      user,
    } as LOGGED_IN_ACTION),
}
