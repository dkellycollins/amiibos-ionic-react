import { useContext } from "react";
import { ContainerContext } from "../components/ContainerProvider";
import { interfaces } from "inversify";

export function useInstance<T>(serviceIdentifier: string | symbol | interfaces.Newable<T> | interfaces.Abstract<T>): T {
  const container = useContext(ContainerContext);
  if (!container) {
    throw new Error('A container was not provided.');
  }

  return container.get<T>(serviceIdentifier);
}