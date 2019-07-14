import React, { FC, useState } from "react";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonIcon, IonFooter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { AmiibosList } from "./AmiibosList";
import { ProgressToolbar } from "./ProgressToolbar";
import { SelectSeriesModal } from "./SelectSeriesModal";
import { useInstance } from "../../core/hooks/useInstance";
import { AmiibosService } from "../services/AmiibosService";

export interface AmiibosPageProps extends RouteComponentProps {

}

export const AmiibosPage: FC<AmiibosPageProps> =
  () => {
    const amiibosService = useInstance(AmiibosService);

    const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
    const [isModalOpen, setIsModelOpen] = useState(false);

    const title = selectedSeries ? selectedSeries : 'All Amiibos';
    const amiibos = selectedSeries ? amiibosService.getAmiibosBySeries(selectedSeries) : amiibosService.getAmiibos();

    return (
      <>
        <IonHeader>
          <IonToolbar>
            <IonTitle>{title}</IonTitle>
            <IonButtons slot="end">
              <IonButton onClick={() => setIsModelOpen(true)}>
                <IonIcon name="funnel" />
              </IonButton>
            </IonButtons>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <AmiibosList amiibos={amiibos} />
        </IonContent>
        <IonFooter>
          <ProgressToolbar />
        </IonFooter>
        <SelectSeriesModal 
          isOpen={isModalOpen} 
          onDismiss={(series) => {
            setSelectedSeries(series);
            setIsModelOpen(false);
          }} 
        />
      </>
    );
  }