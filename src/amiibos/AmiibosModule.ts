import { ContainerModule } from "inversify";
import { AmiibosService } from "./services/AmiibosService";

export const AmiibosModule: ContainerModule = new ContainerModule((bind) => {
  bind(AmiibosService).to(AmiibosService);
});