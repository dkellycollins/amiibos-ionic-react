import React, { FC } from "react";
import { IonItem, IonThumbnail, IonImg, IonLabel, IonToggle } from "@ionic/react";
import { AmiiboModel } from "../services/AmiibosModel";

export interface AmiiboItemProps {
  amiibo: AmiiboModel;

  isCollected: boolean;

  onChange: (isCollected: boolean) => void;
}

export const AmiiboItem: FC<AmiiboItemProps> =
  ({ amiibo, isCollected, onChange }) => {
    return (
      <IonItem lines="full">
        <IonThumbnail slot="start">
          <IonImg src={amiibo.figureUrl} />
        </IonThumbnail>
        <IonLabel>
          <h4>{amiibo.name}</h4>
          <p>{amiibo.series}</p>
        </IonLabel>
        <IonToggle 
          slot="end"
          checked={isCollected}
          onChange={() => {
            console.log(`AmiiboItem`, isCollected);
            onChange(!isCollected)
          }}
        />
      </IonItem>
    );
  }