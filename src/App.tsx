import React, { FC } from 'react';
import './App.css';
import { IonApp } from '@ionic/react';
import { AmiibosPage } from './amiibos/components/AmiibosPage';
import { Router, Route, Redirect } from 'react-router';
import { history } from './config/history';
import { ContainerProvider } from './core/components/ContainerProvider';
import { container } from './config/container';

export const App: FC = () => {
  return (
    <ContainerProvider container={container}>
      <Router history={history}>
        <IonApp>
          <Route path="/amiibos" component={AmiibosPage} />
          <Redirect from="**" to="/amiibos" />
        </IonApp>
      </Router>
    </ContainerProvider>
  );
}
