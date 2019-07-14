import React, { FC } from 'react';
import { IonToolbar } from '@ionic/react';

export interface ProgressToolbarProps {

}

export const ProgressToolbar: FC<ProgressToolbarProps> = 
  () => {
    return (
      <IonToolbar>
        Progress Bar
      </IonToolbar>
    );
  }