import { AppContextState, Song } from './state.model'
import { deepCopy } from '@wilfredlopez/react-utils'
function getSongIds(songs: Song[]) {
  return songs.map(song => song.id)
}

function filterUniqueIds(songIds: string[]) {
  return filterUnique(songIds, (every, current) => every === current)
}

function filterUniqueSongs(songs: Song[]) {
  return filterUnique(songs, (every, current) => every.id === current.id)
}

function filterUnique<T extends any>(
  songs: T[],
  where: (every: T, current: T) => boolean
) {
  return songs.reduce((prev, curr) => {
    if (prev.findIndex(s => where(s, curr)) !== -1) {
      return [...prev]
    }
    return [...prev, curr]
  }, [] as T[])
}

export function getMusic(state: AppContextState, songs: Song[], deep = false) {
  if (deep) {
    return getMusicDeep(state, songs)
  }
  const uniqueTracks = filterUniqueSongs([...state.music.tracks, ...songs])
  const songsIds = getSongIds(songs)
  const uniqueNew = filterUniqueIds([...state.music.newTracks, ...songsIds])
  const hotTracks = songs
    .filter(s => s.promoted && s.promoted === true)
    .map(s => s.id)

  const uniqueHot = filterUniqueIds([...hotTracks, ...state.music.hotTracks])
  return {
    tracks: uniqueTracks,
    newTracks: uniqueNew,
    hotTracks: uniqueHot,
  }
}
function getMusicDeep(state: AppContextState, payload: Song[]) {
  const oldTracks = deepCopy(state.music.tracks)
  const newTracks = payload.map(s => s.id)
  const hotTracks = payload
    .filter(s => s.promoted && s.promoted === true)
    .map(s => s.id)

  const uniqueHot = deepCopy([...hotTracks, ...state.music.hotTracks])
  const uniqueNew = deepCopy([...newTracks, ...state.music.newTracks])
  const uniqueTracks = filterUniqueSongs([...payload, ...oldTracks])
  return {
    tracks: uniqueTracks,
    newTracks: uniqueNew,
    hotTracks: uniqueHot,
  }
}

// Some state selectors
export const isPlayerOpen = (state: AppContextState) => state.ui.playerOpen

// Get all tracks in database
export const getTracks = (state: AppContextState) => state.music.tracks

export const getNewTracks = (state: AppContextState) =>
  state.music.tracks.filter(t => state.music.newTracks.find(nt => nt === t.id))

export const getHotTracks = (state: AppContextState) =>
  state.music.tracks.filter(t => state.music.hotTracks.find(nt => nt === t.id))

export const getFavTracks = (state: AppContextState) => state.user.favTracks

export const getRecentTracks = (state: AppContextState) =>
  state.user.recentTracks

export const isFavTrack = (state: AppContextState, track: Song) =>
  !!state.user.favTracks.find(t => t.id === track.id)

export const getPlaying = (state: AppContextState) => state.playing

export const getCurrentTrack = (state: AppContextState) =>
  state.music.tracks[state.playing ? state.playing.index || 0 : 0]

export const getTrack = (state: AppContextState, id: string) =>
  state.music.tracks.find(t => t.id === id)

export const getTrackIndex = (state: AppContextState, id: string) =>
  state.music.tracks.findIndex(t => t.id === id)

export const getUser = (state: AppContextState) => state.user
