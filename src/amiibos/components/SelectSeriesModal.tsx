import React, { FC } from 'react';
import { IonModal, IonList, IonItem, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/react';
import { useInstance } from '../../core/hooks/useInstance';
import { AmiibosService } from '../services/AmiibosService';

export interface SelectSeriesModalProps {
  isOpen: boolean;

  onDismiss: (selectedSeries: string | null) => void;
}

export const SelectSeriesModal: FC<SelectSeriesModalProps> =
  ({ isOpen, onDismiss }) => {
    const amiibosService = useInstance(AmiibosService);
    
    return (
      <IonContent>
        <IonModal isOpen={isOpen} onDidDismiss={() => onDismiss(null)}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Select a Series</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonList>
            {amiibosService.getAmiiboSeries().map(series => (
              <IonItem key={series} lines="full" onClick={() => onDismiss(series)}>
                {series}
              </IonItem>
            ))}
          </IonList>
        </IonModal>
      </IonContent>
    );
  }