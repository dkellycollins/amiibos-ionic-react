import React from 'react';
import './App.css';
import { IonApp, IonContent, IonCard, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/react';

const App: React.FC = () => {
  return (
    <IonApp>
      <IonContent>
        <IonCard>
          <IonCardHeader>
            <IonCardSubtitle>Welcome to Ionic</IonCardSubtitle>
            <IonCardTitle>Running on React</IonCardTitle>
          </IonCardHeader>
        </IonCard>
      </IonContent>
    </IonApp>
  );
}

export default App;
