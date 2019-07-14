import { AmiiboModel } from "./AmiibosModel";

export interface UserAmiiboModel extends AmiiboModel {
  isCollected: boolean;
}