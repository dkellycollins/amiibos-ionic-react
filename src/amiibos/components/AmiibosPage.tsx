import React, { FC, useState } from "react";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonFooter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { AmiibosList } from "./AmiibosList";
import { ProgressToolbar } from "./ProgressToolbar";
import { SelectSeriesModal } from "./SelectSeriesModal";
import { useInstance } from "../../core/hooks/useInstance";
import MdFunnel from 'react-ionicons/lib/MdFunnel';
import { UserAmiibosService } from "../services/UserAmiibosService";
import { useAmiibos } from "../hooks/useAmiibos";

export interface AmiibosPageProps extends RouteComponentProps {

}

export const AmiibosPage: FC<AmiibosPageProps> =
  () => {
    const userAmiibosService = useInstance(UserAmiibosService);

    const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
    const [isModalOpen, setIsModelOpen] = useState(false);

    const amiibos = useAmiibos(selectedSeries);

    const title = selectedSeries ? selectedSeries : 'All Amiibos';

    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsModelOpen(true)}>
                <MdFunnel />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <AmiibosList 
            amiibos={amiibos}
            onChange={(slug, isCollected) => {
              console.log(`AmiibosPage`, slug, isCollected);
              userAmiibosService.toggleAmiibo(slug, isCollected);
            }} 
          />
        </IonContent>
        <IonFooter>
          <ProgressToolbar />
        </IonFooter>
        <SelectSeriesModal 
          isOpen={isModalOpen} 
          onSelectSeries={(series) => {
            setSelectedSeries(series);
            setIsModelOpen(false);
          }} 
          onDismiss={() => setIsModelOpen(false)}
        />
      </>
    );
  }
