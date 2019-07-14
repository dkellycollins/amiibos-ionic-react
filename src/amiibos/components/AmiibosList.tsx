import React, { FC } from 'react';
import { IonList } from '@ionic/react';
import { AmiiboItem } from './AmiiboItem';
import { UserAmiiboModel } from '../services/UserAmiiboModel';

export interface AmiibosListProps {
  amiibos: Array<UserAmiiboModel>;

  onChange: (slug: string, isCollected: boolean) => void;
}

export const AmiibosList: FC<AmiibosListProps> =
  ({ amiibos, onChange }) => {
    return (
      <IonList>
        {amiibos.map(amiibo => (
          <AmiiboItem 
            key={amiibo.slug} 
            amiibo={amiibo} 
            isCollected={amiibo.isCollected} 
            onChange={(isCollected) => onChange(amiibo.slug, isCollected)} 
          />
        ))}
      </IonList>
    );
  }