import React, { createContext, FC } from 'react';
import { Container } from 'inversify';

export const ContainerContext = createContext<Container | null>(null);

export interface ContainerProviderProps {
  container: Container;
}

export const ContainerProvider: FC<ContainerProviderProps> = 
  ({ container, children }) => {
    return (
      <ContainerContext.Provider value={container}>
        {children}
      </ContainerContext.Provider>
    );
  }