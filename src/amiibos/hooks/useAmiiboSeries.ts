import { useInstance } from "../../core/hooks/useInstance";
import { AmiibosService } from "../services/AmiibosService";
import { useObservable } from "../../core/hooks/useObservable";

export function useAmiiboSeries(): Array<string> {
  const amiibosService = useInstance(AmiibosService);
  return useObservable(() => amiibosService.getAmiiboSeries(), [], [amiibosService]);
}
