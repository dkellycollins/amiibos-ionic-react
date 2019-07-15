import React, { FC } from 'react';
import { IonModal, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton } from '@ionic/react';
import { useInstance } from '../../core/hooks/useInstance';
import { AmiibosService } from '../services/AmiibosService';
import MdClose from 'react-ionicons/lib/MdClose';
import { useObservable } from '../../core/hooks/useObservable';

export interface SelectSeriesModalProps {
  isOpen: boolean;

  onSelectSeries: (selectedSeries: string | null) => void;

  onDismiss: () => void;
}

export const SelectSeriesModal: FC<SelectSeriesModalProps> =
  ({ isOpen, onSelectSeries, onDismiss }) => {
    const amiibosService = useInstance(AmiibosService);

    const series = useObservable(() => amiibosService.getAmiiboSeries(), [], [amiibosService]);

    return (
      <IonContent>
        <IonModal isOpen={isOpen} onDidDismiss={() => isOpen && onDismiss()}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Select a Series</IonTitle>
              <IonButtons slot="end">
                <IonButton onClick={() => isOpen && onDismiss()}>
                  <MdClose />
                </IonButton>
              </IonButtons>
            </IonToolbar>
          </IonHeader>
          <IonList>
            <IonItem lines="full" onClick={() => onSelectSeries(null)}>
              All Amiibos
            </IonItem>
            {series.map(s => (
              <IonItem key={s} lines="full" onClick={() => onSelectSeries(s)}>
                {s}
              </IonItem>
            ))}
          </IonList>
        </IonModal>
      </IonContent>
    );
  }