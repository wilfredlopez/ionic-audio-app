import React, { useCallback } from 'react'

import {
  IonModal,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonRange,
  IonButtons,
  IonButton,
  IonIcon,
  IonGrid,
  IonRow,
  IonCol,
} from '@ionic/react'

import {
  arrowDown,
  heart,
  heartOutline,
  playSkipBack,
  play,
  pause,
  playSkipForward,
  //   removeCircleOutline,
} from 'ionicons/icons'

import {
  isPlayerOpen,
  ActionCreators,
  getCurrentTrack,
  isFavTrack,
} from '../appState'
import { Song } from '../generated/apolloComponents'

import useAudioControls from '../hooks/useAudioControls'
import './TrackPlayer.css'
import { useAppState } from 'src/appState/AppContextProvider'

interface TrackProgressProps {
  currentAudioTime: string
  currentAudioTimeLeft: string
  percentPlayed: number
  onSeek: (time: number) => void
}

const TrackProgressFull = ({
  onSeek,
  percentPlayed,
  currentAudioTime,
  currentAudioTimeLeft,
}: TrackProgressProps) => {
  return (
    <div className='track-progress'>
      <IonRange
        value={percentPlayed}
        onIonChange={(e: any) => {
          const value = e.detail.value
          if (+value !== percentPlayed) {
            onSeek(+e.detail.value)
          }
        }}
      />
      <div className='track-progress-time'>
        <div className='track-progress-time-current'>
          {currentAudioTime}
          {/* {msToTime(time)} */}
        </div>
        <div className='track-progress-time-left'>
          {currentAudioTimeLeft}
          {/* -{msToTime(left)} */}
        </div>
      </div>
    </div>
  )
}

const IconStyle = {
  flex: '1 1',
  alignSelf: 'flex-end',
}

interface TrackControlProps {
  isPlaying: boolean
  track?: Song
  isFav?: boolean
  onPause: () => void
  onPlay: () => void
  onPrev: () => void
  onNext: () => void
  onFav: () => void
}

const TrackControls = ({
  isPlaying,
  isFav,
  onPause,
  onPlay,
  onPrev,
  onNext,
  onFav,
}: TrackControlProps) => {
  return (
    <div className='track-controls track-controls-full'>
      <IonIcon style={IconStyle} onClick={onPrev} icon={playSkipBack} />
      {!isPlaying ? (
        <IonIcon
          onClick={onPlay}
          style={{
            ...IconStyle,
            transform: 'translate(0px, 10px)',
          }}
          className='play-pause'
          icon={play}
        />
      ) : (
          <IonIcon
            style={{
              ...IconStyle,
              transform: 'translate(0px, 10px)',
            }}
            onClick={onPause}
            className='play-pause'
            icon={pause}
          />
        )}
      <IonIcon onClick={onNext} style={IconStyle} icon={playSkipForward} />
    </div>
  )
}

interface TrackPlayerProps {
  track?: Song
  closed?: boolean
}

const TrackPlayer = (_props: TrackPlayerProps) => {
  const [state] = useAppState()
  const dispatch = state.dispatch
  const { isPlaying } = state.playing
  const handleClose = useCallback(() => {
    dispatch(ActionCreators.closePlayer())
  }, [dispatch])

  // const [muted, setMuted] = React.useState(false);
  // const currentAudioTimeRef = React.useRef("0");

  // function toggleMute() {
  //     if (muted)
  //     {
  //         controls.unmute();
  //         setMuted(false);
  //     } else
  //     {
  //         controls.mute();
  //         setMuted(true);
  //     }
  // }
  const handleTogglePlaying = () => {
    if (isPlaying) {
      // controls.pause();//useEffect should do it automatically
      dispatch(ActionCreators.pauseTrack())
    } else {
      // controls.play(); //useEffect should do it automatically
      dispatch(ActionCreators.playTrack())
    }
  }

  const open = isPlayerOpen(state)
  const track = getCurrentTrack(state)
  const isFav = isFavTrack(state, track)
  const [
    {
      audio,
      controls,
      state: audioState,
      currentAudioTimeRef,
      currentAudioTimeLeftRef,
      ref,
    },
  ] = useAudioControls({
    src: track.audioUrl,
    autoPlay: false,
    loop: false,
    'aria-label': track.name,
  })

  const percentPlayed = audioState.percentPlayed

  React.useEffect(() => {
    dispatch(ActionCreators.setPercentPlayed(percentPlayed))
    //eslint-disable-next-line
  }, [percentPlayed])

  //React to change in isPlaying state.
  React.useEffect(() => {
    if (isPlaying) {
      controls.play()
    } else {
      controls.pause()
    }
    //eslint-disable-next-line
  }, [isPlaying, track])

  function playPrev() {
    dispatch(ActionCreators.prevTrack())
  }

  const playNext = React.useCallback(() => {
    dispatch(ActionCreators.nextTrack())
    //eslint-disable-next-line
  }, [])

  React.useLayoutEffect(() => {
    if (currentAudioTimeRef) {
      dispatch(ActionCreators.setCurrentAudioTime(currentAudioTimeRef.current))
    }
    //eslint-disable-next-line
  }, [audioState.time])

  //Playnext track when audio ends.
  React.useLayoutEffect(() => {
    if (ref) {
      const theref = ref
      if (theref && theref.current && theref.current.currentTime) {
        if (theref.current.currentTime === audioState.duration) {
          playNext()
        }
      }
    }
  }, [playNext, audioState.duration, ref])

  function handleSeek(seekTo: number) {
    controls.seek(Math.floor(seekTo))
  }

  //Autoplay... causing issues.
  // React.useLayoutEffect(() => {

  //         if (!playing.isPlaying)
  //         {
  //             controls.play();
  //             dispatch(ActionCreators.playTrack())
  //         }
  //         return () => {
  //             controls.pause();
  //             dispatch(ActionCreators.pauseTrack())
  //         };
  //         //eslint-disable-next-line
  // }, [ playing, controls]);

  return (
    <React.Fragment>
      {audio}
      <IonModal isOpen={open} onDidDismiss={handleClose}>
        <IonHeader className='track-player'>
          <IonToolbar>
            <IonButtons slot='start'>
              <IonButton
                fill='clear'
                onClick={() => dispatch(ActionCreators.closePlayer())}
              >
                <IonIcon icon={arrowDown} />
              </IonButton>
            </IonButtons>
            <IonTitle>{track.title}</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className='track-content min-height-100'>
          <IonGrid>
            <IonRow>
              <IonCol>
                <img src={track.imageUrl} alt={track.title} />
                <div className='player-title-favorite'>
                  <div>
                    <h2>{track.title}</h2>
                    <h4>{track.artist}</h4>
                  </div>
                  <div className='fav-icon-container'>
                    <IonIcon
                      style={IconStyle}
                      onClick={() => dispatch(ActionCreators.favTrack(track))}
                      icon={isFav ? heart : heartOutline}
                    />
                  </div>
                </div>
                <TrackProgressFull
                  percentPlayed={audioState.percentPlayed}
                  currentAudioTime={currentAudioTimeRef.current}
                  currentAudioTimeLeft={currentAudioTimeLeftRef.current}
                  onSeek={(n: number) => handleSeek(n)}
                />
                <div
                  className='separator'
                  style={{
                    height: 30,
                  }}
                />
                <TrackControls
                  isPlaying={isPlaying}
                  track={track}
                  isFav={isFav}
                  onPause={() => {
                    handleTogglePlaying()
                  }}
                  onPlay={() => handleTogglePlaying()}
                  onPrev={() => playPrev()}
                  onNext={() => playNext()}
                  onFav={() => dispatch(ActionCreators.favTrack(track))}
                />
              </IonCol>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonModal>
    </React.Fragment>
  )
}

export default TrackPlayer
