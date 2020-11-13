import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonPopover,
  IonThumbnail,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import { ellipsisVertical, removeCircleOutline } from 'ionicons/icons'
import React, { useCallback, useState } from 'react'
import { useHistory } from 'react-router'
import { useAppState } from 'src/appState/AppContextProvider'
import { Logo } from 'src/components/Logo'
import {
  getFavTracks,
  getRecentTracks,
  ActionCreators,
} from '../appState'
import { Song } from '../generated/apolloComponents'
import urls from '../urls'

const You = () => {
  const history = useHistory()
  const [state, dispatch] = useAppState()

  const [showUserMenuEvent, setShowUserMenuEvent] = useState<
    React.MouseEvent<HTMLIonButtonElement, MouseEvent> | undefined
  >(undefined)
  const recentTracks = getRecentTracks(state)
  const favTracks = getFavTracks(state)

  const doPlay = useCallback(
    (track: Song) => {
      dispatch(ActionCreators.playTrack(track))
    },
    [dispatch]
  )

  const doLogout = useCallback(async () => {
    setShowUserMenuEvent(undefined)
    dispatch(ActionCreators.logout())
    setTimeout(() => {
      history.push(urls.LOGIN)
    }, 1000)
  }, [dispatch, history])

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <Logo />
          </IonButtons>
          <IonTitle>Your Library</IonTitle>
          <IonButtons slot='end'>
            <IonButton
              fill='clear'
              onClick={e => {
                e.persist()
                setShowUserMenuEvent(e)
              }}
            >
              <IonIcon icon={ellipsisVertical} />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonPopover
          event={showUserMenuEvent as any}
          isOpen={!!showUserMenuEvent}
          onDidDismiss={() => setShowUserMenuEvent(undefined)}
        >
          <IonContent>
            <IonList>
              <IonItem
                onClick={e => {
                  e.preventDefault()
                  doLogout()
                }}
                detail={true}
                href=''
              >
                <IonLabel>Log out</IonLabel>
              </IonItem>
            </IonList>
          </IonContent>
        </IonPopover>
        <IonList>
          <IonListHeader>
            <IonLabel>Recent Tracks</IonLabel>
          </IonListHeader>
          {recentTracks.map(track => (
            <IonItem
              key={track.id + '-RecentTracks'}
              onClick={() => doPlay(track)}
              button
            >
              <IonThumbnail slot='start'>
                <img src={track.imageUrl} alt={track.title} />
              </IonThumbnail>
              <IonLabel>
                <h2>{track.title}</h2>
                <p>{track.artist}</p>
              </IonLabel>
            </IonItem>
          ))}
        </IonList>

        <IonList>
          <IonListHeader>
            <IonLabel>Favorite Tracks</IonLabel>
          </IonListHeader>
          {favTracks.map(track => (
            <IonItem
              key={track.id + '-FavTracks'}
              onClick={() => doPlay(track)}
              button
            >
              <IonThumbnail slot='start'>
                <img src={track.imageUrl} alt={track.title} />
              </IonThumbnail>
              <IonLabel>
                <h2>{track.title}</h2>
                <p>{track.artist}</p>
              </IonLabel>
              <IonIcon
                onClick={e => {
                  e.stopPropagation()
                  dispatch(ActionCreators.favTrack(track))
                }}
                icon={removeCircleOutline}
                slot='end'
              />
            </IonItem>
          ))}
        </IonList>
      </IonContent>
    </IonPage>
  )
}

export default You
