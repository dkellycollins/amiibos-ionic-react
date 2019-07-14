import React, { FC, useState, useMemo } from "react";
import { IonContent, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonFooter } from "@ionic/react";
import { RouteComponentProps } from "react-router";
import { AmiibosList } from "./AmiibosList";
import { ProgressToolbar } from "./ProgressToolbar";
import { SelectSeriesModal } from "./SelectSeriesModal";
import { useInstance } from "../../core/hooks/useInstance";
import { AmiibosService } from "../services/AmiibosService";
import MdFunnel from 'react-ionicons/lib/MdFunnel';
import { UserAmiibosService } from "../services/UserAmiibosService";
import { useObservable } from "../../core/hooks/useObservable";

export interface AmiibosPageProps extends RouteComponentProps {

}

export const AmiibosPage: FC<AmiibosPageProps> =
  () => {
    const amiibosService = useInstance(AmiibosService);
    const userAmiibosService = useInstance(UserAmiibosService);

    const [selectedSeries, setSelectedSeries] = useState<string | null>(null)
    const [isModalOpen, setIsModelOpen] = useState(false);

    const collectedAmiibos$ = useMemo(() => userAmiibosService.getCollectedAmiibos(), [userAmiibosService]);
    const collectedAmiibos = useObservable(collectedAmiibos$, []);

    const title = selectedSeries ? selectedSeries : 'All Amiibos';
    const amiibos = selectedSeries 
      ? amiibosService.getAmiibosBySeries(selectedSeries).map(amiibo => ({ ...amiibo, isCollected: collectedAmiibos.indexOf(amiibo.slug) > 0})) 
      : amiibosService.getAmiibos().map(amiibo => ({ ...amiibo, isCollected: collectedAmiibos.indexOf(amiibo.slug) > 0}));

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
            onChange={(slug, isCollected) => userAmiibosService.toggleAmiibo(slug, isCollected)} />
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