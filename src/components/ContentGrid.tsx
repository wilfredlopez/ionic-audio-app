import { IonCol, IonGrid, IonRow } from '@ionic/react'
import React, { PropsWithChildren } from 'react'

interface Props {

}

export const ContentGrid = ({ children }: PropsWithChildren<Props>) => {
    return (
        <IonGrid>
            <IonRow className="ion-justify-content-center">
                <IonCol sizeMd="8">
                    {children}
                </IonCol>
            </IonRow>
        </IonGrid>
    )
}
