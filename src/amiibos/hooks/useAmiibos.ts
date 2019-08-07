import { UserAmiiboModel } from "../services/UserAmiiboModel";
import { useInstance } from "../../core/hooks/useInstance";
import { AmiibosService } from "../services/AmiibosService";
import { useObservable } from "../../core/hooks/useObservable";
import { UserAmiibosService } from "../services/UserAmiibosService";

export function useAmiibos(series: string | null | undefined): Array<UserAmiiboModel> {
  const amiibosService = useInstance(AmiibosService);
  const userAmiibosService = useInstance(UserAmiibosService);

  const amiibos = useObservable(() => {
    return !!series
      ? amiibosService.getAmiibosBySeries(series)
      : amiibosService.getAmiibos()
  }, [], [amiibosService, series]);
  const collectedAmiibos = useObservable(() => {
    return userAmiibosService.getCollectedAmiibos();
  }, [], [userAmiibosService]);

  return amiibos
    .map(amiibo => ({
      ...amiibo,
      isCollected: collectedAmiibos.indexOf(amiibo.slug) >= 0
    }));
}
