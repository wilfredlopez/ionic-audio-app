import { IonCol, IonItem, IonLabel } from '@ionic/react'
import React from 'react'
import { Song } from 'src/appState/State'

interface Props {
    track: Song
    handlePlay: (song: Song) => void
}

const NewTrack = ({ track, handlePlay }: Props) => {
    return (
        <IonCol
            size={'6'}
            className="new-track"

            onClick={() => handlePlay(track)}
        >
            <img src={track.imageUrl} alt={track.title} />
            <IonItem lines="none">
                <IonLabel>
                    <h3>{track.title}</h3>
                    <p>{track.artist}</p>
                </IonLabel>
            </IonItem>
        </IonCol>
    )
}


export default React.memo(NewTrack)