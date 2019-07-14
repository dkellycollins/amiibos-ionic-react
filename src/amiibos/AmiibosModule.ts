import { ContainerModule } from "inversify";
import { AmiibosService } from "./services/AmiibosService";
import { UserAmiibosService } from "./services/UserAmiibosService";

export const AmiibosModule: ContainerModule = new ContainerModule((bind) => {
  bind(AmiibosService).to(AmiibosService);
  bind(UserAmiibosService).to(UserAmiibosService);
});