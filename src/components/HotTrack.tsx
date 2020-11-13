import { IonItem, IonThumbnail, IonLabel } from '@ionic/react'
import React from 'react'
import { Song } from '../generated/apolloComponents'

interface Props {
  track: Song
  handlePlay: (song: Song) => void
}

const HotTrack = ({ track, handlePlay }: Props) => {
  return (
    <IonItem onClick={() => handlePlay(track)} button>
      <IonThumbnail slot='start'>
        <img src={track.imageUrl} alt={track.title} />
      </IonThumbnail>
      <IonLabel>
        <h2>{track.title}</h2>
        <p>{track.artist}</p>
      </IonLabel>
    </IonItem>
  )
}

export default React.memo(HotTrack)
