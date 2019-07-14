import React, { FC } from 'react';
import { IonList } from '@ionic/react';
import { AmiiboItem } from './AmiiboItem';
import { AmiiboModel } from '../services/AmiibosModel';

export interface AmiibosListProps {
  amiibos: Array<AmiiboModel>;
}

export const AmiibosList: FC<AmiibosListProps> =
  ({ amiibos }) => {
    return (
      <IonList>
        {amiibos.map(amiibo => (
          <AmiiboItem key={amiibo.slug} amiibo={amiibo} />
        ))}
      </IonList>
    );
  }