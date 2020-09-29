import {
  IonButton,
  IonButtons,
  IonCol,
  IonContent,
  IonGrid,
  IonHeader,
  IonLabel,
  IonList,
  IonListHeader,
  IonPage,
  IonRow,
  IonTitle,
  IonToolbar,
} from '@ionic/react'
import React, { useCallback, useState } from 'react'
import { useAppState } from 'src/appState/AppContextProvider'
import { ContentGrid } from 'src/components/ContentGrid'
import HotTrack from 'src/components/HotTrack'
import { Logo } from 'src/components/Logo'
import NewTrack from 'src/components/NewTrack'
import { APP_TITLE } from 'src/constants'
import { getHotTracks } from '../appState'
import './Home.css'

import { useGetAllSongsLazyQuery } from 'src/hooks/useGetSongsQuery'
import { Song } from 'src/appState'
const MAX = 10
const initialStateStaticTracksCount = 3

const Home = () => {
  const [state, dispatch, ActionCreators] = useAppState()

  const [disableLoadMore, setDisableLoadMore] = useState(false)
  const getHots = React.useCallback(() => getHotTracks(state), [state])

  let lastHots: Song[] = []
  const hotTracks = getHots()
  if (hotTracks.length < MAX) {
    lastHots = hotTracks
  } else {
    const h = []
    for (let i = hotTracks.length - 1; i > MAX; i--) {
      h.push(hotTracks[i])
    }
    lastHots = h
  }

  const [loadMoreSongs, { loading }] = useGetAllSongsLazyQuery({
    onCompleted: ({ getAllSongs }) => {
      if (
        getAllSongs.totalCount >=
        state.music.tracks.length - 1 + initialStateStaticTracksCount
      ) {
        setDisableLoadMore(true)
      }
      if (getAllSongs.songs) {
        dispatch(ActionCreators.addSongsIfNotExist(getAllSongs.songs))
      }
    },
  })
  const doPlay = useCallback(
    track => {
      dispatch(ActionCreators.playTrack(track))
    },
    [dispatch, ActionCreators]
  )

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <Logo />
          </IonButtons>
          <IonTitle>{APP_TITLE}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ContentGrid>
          <IonList>
            <IonListHeader>
              <IonLabel>Hot Tracks</IonLabel>
            </IonListHeader>
            {lastHots.map(track => (
              <HotTrack
                key={track.id + '-hottracks'}
                track={track}
                handlePlay={doPlay}
              />
            ))}
          </IonList>

          <IonList>
            <IonListHeader>
              <IonLabel>New Music</IonLabel>
            </IonListHeader>
            <IonGrid>
              <IonRow>
                {state.music.tracks.map(track => (
                  <NewTrack
                    key={track.id + '-NewTracks'}
                    track={track}
                    handlePlay={doPlay}
                  />
                ))}
              </IonRow>
            </IonGrid>
          </IonList>
          <IonGrid>
            <IonRow className='ion-justify-content-center'>
              <IonCol size='auto'>
                <IonButton
                  shape='round'
                  fill='outline'
                  disabled={loading || disableLoadMore}
                  onClick={() => {
                    if (disableLoadMore) {
                      console.log('disableLoadMore')
                      return
                    }
                    loadMoreSongs({
                      variables: {
                        limit: 20,
                        skip:
                          state.music.tracks.length -
                          1 -
                          initialStateStaticTracksCount,
                      },
                    })
                  }}
                >
                  Load More
                </IonButton>
              </IonCol>
            </IonRow>
          </IonGrid>
        </ContentGrid>
      </IonContent>
    </IonPage>
  )
}

export default React.memo(Home)
